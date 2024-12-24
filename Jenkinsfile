pipeline {
    agent {
        node {
            label 'agent1'
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
        stage('Build') {
            steps {
                script {
                    sh "docker build --no-cache --target production -t $DOCKER_CREDENTIALS_USR/edusaig:$BUILD_NUMBER ."
                    // ใช้คำสั่ง docker.build เพื่อทำการ build image ของโปรเจคของเรา
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
                        sh "git clone $MANIFEST_REPO"
                        sh 'sed -i 's/^\([[:space:]]*tag:[[:space:]]*\).*/\1"${BUILD_NUMBER}"/' $MANIFEST_REPO/values.yaml'
                        sh "cd edusaig-manifest && git add . && git commit -m 'Update tag to $BUILD_NUMBER' && git push"
                        // ใช้คำสั่ง git clone เพื่อทำการ clone โปรเจคของเรา และใช้คำสั่ง sed เพื่อทำการแก้ไขไฟล์ values.yaml ในโปรเจคของเรา
                    }
                    // ใช้คำสั่ง git clone เพื่อทำการ clone โปรเจคของเรา
                }
            }
        }
    }
    
    post {
        always {
            sh "docker rmi $DOCKER_CREDENTIALS_USR/edusaig:$BUILD_NUMBER"
            sh "docker rmi registry.hub.docker.com/$DOCKER_CREDENTIALS_USR/edusaig:$BUILD_NUMBER"
            // ใช้คำสั่ง docker rmi เพื่อทำการลบ image ที่เรา build และ push ไปยัง Docker Hub
        }
    }
}