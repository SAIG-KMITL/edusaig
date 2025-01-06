pipeline {
    agent {
        node {
            label 'main-agent'
            // label คือชื่อของเครื่องที่เราต้องการให้ Jenkins ทำการ build โปรเจคของเรา
        }
    }

    triggers {
        pollSCM('* * * * *')
        // pollSCM คือการทำให้ Jenkins ทำการตรวจสอบการเปลี่ยนแปลงของโค้ด โดยในที่นี้เราให้ Jenkins ตรวจสอบทุกๆ 1 นาที
    }

    environment {
        DOCKER_CREDENTIALS = credentials('gan-docker-hub')
        // กำหนดตัวแปรชื่อ DOCKER_CREDENTIALS โดยให้มีค่าเป็น credentials ที่ชื่อ gan-docker-hub
    }

    stages {
        stage('Install Dependencies') {
            steps {
                nodejs(nodeJSInstallationName: 'yarn') {
                    sh 'yarn install'
                }
            }
        }
        
        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '--scan ./', odcInstallation: 'dependency-check'
                dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
                // ใช้คำสั่ง dependencyCheck เพื่อทำการวิเคราะห์ dependency ของโปรเจคของเรา
            }
        }
        
        stage('SonarQube Analysis') {
            steps {
                script {
                    scannerHome = tool 'sonarqube-scanner'// must match the name of an actual scanner installation directory on your Jenkins build agent
                }
                withSonarQubeEnv('sonarqube-server') {// If you have configured more than one global server connection, you can specify its name as configured in Jenkins
                    sh "${scannerHome}/bin/sonar-scanner \
                            -Dsonar.organization=ganthepro \
                            -Dsonar.projectKey=ganthepro_edusaig \
                            -Dsonar.sources=. \
                            -Dsonar.host.url=https://sonarcloud.io"
                }
                // ใช้คำสั่ง sonar-scanner เพื่อทำการวิเคราะห์โค้ดของเรา
            }
        }

        stage('Build') {
            steps {
                script {
                    sh 'docker build --no-cache --target production -t $DOCKER_CREDENTIALS_USR/edusaig:$BUILD_NUMBER .'
                    // ใช้คำสั่ง docker.build เพื่อทำการ build image ของโปรเจคของเรา
                }
            }
        }
        
        stage("Image Analysis") {
            steps {
                script {
                    sh 'trivy image --no-progress --exit-code 1 --severity HIGH,CRITICAL $DOCKER_CREDENTIALS_USR/edusaig:$BUILD_NUMBER'
                }
            }
        }

        stage("Filesystem Analysis") {
            steps {
                script {
                    sh 'docker run --rm -it $DOCKER_CREDENTIALS_USR/edusaig:$BUILD_NUMBER 
                        / curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
                        / trivy fs /'
                    }
                }
            }
        }

        stage('Push') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'gan-docker-hub') {
                        docker.image("$DOCKER_CREDENTIALS_USR/edusaig:$BUILD_NUMBER").push()
                        // ใช้คำสั่ง docker.image.push เพื่อทำการ push image ของเราไปยัง Docker Hub
                    }
                }
            }
        }

        stage('Deployment') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'edusaig-manifest-repo', variable: 'MANIFEST_REPO')]) {
                        sh 'git clone $MANIFEST_REPO'
                        sh 'sed -i "s/^\\([[:space:]]*tag:[[:space:]]*\\).*/\\1\\"$BUILD_NUMBER\\"/" edusaig-manifests/values.yaml'
                        sh 'git config --global user.email "ganzazamar@gmail.com"'
                        sh 'git config --global user.name "ganthepro"'
                        sh 'cd edusaig-manifests && git add . && git commit -m "Update tag to $BUILD_NUMBER" && git push'
                        // ใช้คำสั่ง git clone เพื่อทำการ clone โปรเจคของเรา และใช้คำสั่ง sed เพื่อทำการแก้ไขไฟล์ values.yaml ในโปรเจคของเรา
                    }
                }
            }
        }
    }
    
    post {
        always {
            sh 'echo y | docker system prune -a'
            sh 'rm -rf edusaig-manifests'
            // ใช้คำสั่ง docker rmi เพื่อทำการลบ image ที่เรา build และ push ไปยัง Docker Hub
            cleanWs(cleanWhenNotBuilt: false,
                deleteDirs: true,
                disableDeferredWipeout: true,
                notFailBuild: true,
                patterns: [[pattern: '.gitignore', type: 'INCLUDE'],
                           [pattern: '.propsfile', type: 'EXCLUDE']])
        }
    }
}