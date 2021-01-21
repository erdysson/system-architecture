pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {
        stage('Build Backend') {
            steps {
                dir('app') {
                    script {
                        docker.build('nest_app', '--no-cache -f Dockerfile .')
                    }
                }
           }
        }

        stage('Build Frontend') {
            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                dir ('app-frontend') {
                    script {
                        sh('./build.sh')
                    }
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('app-frontend') {
                    script {
                        docker.build('angular_app', '-f Dockerfile .')
                    }
                }
           }
        }
    }
}
