pipeline {
    agent any

    environment {
        HOME = '.'
    }

    stages {
        stage('Build Backend') {

            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                dir('app') {
                    script {
                        sh('./build.sh')
                        docker.build('nest_app', '-f Dockerfile .')
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
                        docker.build('angular_app', '-f Dockerfile .')
                    }
                }
            }
        }
    }
}
