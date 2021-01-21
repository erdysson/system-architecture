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
                sh('''./app/build.sh''')
            }
        }

        stage('Build Frontend') {
            agent {
                docker {
                    image 'node:14-alpine'
                }
            }

            steps {
                sh('''./app-frontend/build.sh''')
            }
        }
    }
}
