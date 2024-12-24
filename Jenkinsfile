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

    parameters {
        credentials credentialType: 'org.jenkinsci.plugins.plaincredentials.impl.StringCredentialsImpl', defaultValue: 'edusaig-manifest-repo', name: 'manifest-repo', required: false
    }


    stages {
        // stage('Build') {
        //     steps {
        //         script {
        //             sh "docker build --no-cache --target production -t $DOCKER_CREDENTIALS_USR/edusaig:$BUILD_NUMBER ."
        //             // ใช้คำสั่ง docker.build เพื่อทำการ build image ของโปรเจคของเรา
        //         }
        //     }
        // }

        // stage('Push') {
        //     steps {
        //         script {
        //             docker.withRegistry('https://registry.hub.docker.com', 'gan-docker-hub') {
        //                 docker.image("$DOCKER_CREDENTIALS_USR/edusaig:$BUILD_NUMBER").push()
        //                 // ใช้คำสั่ง docker.image.push เพื่อทำการ push image ของเราไปยัง Docker Hub
        //             }
        //         }
        //     }
        // }

        stage('Deployment') {
            script {
                sh "git clone $manifest-repo"
                // ใช้คำสั่ง kubectl set image เพื่อทำการ set image ใหม่ให้กับ deployment ของเรา
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