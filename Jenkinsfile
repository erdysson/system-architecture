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
                        bash('./build.sh')
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
                        bash('./build.sh')
                    }
                }
            }
        }
    }
}
