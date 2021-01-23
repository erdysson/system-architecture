pipeline {
    agent any

    environment {
        HOME = '.'
        CHROME_BIN = '/bin/google-chrome'
    }

    stages {

        stage('Build Backend') {
            steps {
                dir('app') {
                    script {
                        sh('''./scripts/build.sh''')
                    }
                }
           }
        }

        stage('Build Frontend') {
            steps {
                dir ('app-frontend') {
                    script {
                        sh('''./scripts/build.sh''')
                    }
                }
            }
        }

        stage('Initiate Environment') {

            steps {
                dir ('app') {
                    script {
                        sh('''./scripts/start.sh''')
                    }
                }

                dir ('app-frontend') {
                    script {
                        sh('''./scripts/start.sh''')
                    }
                }

                dir ('nginx') {
                    script {
                        sh('''./scripts/start.sh''')
                    }
                }
            }
        }

        stage('Test') {

            agent {
                docker {
                    image 'cypress/base:10'
                }
            }

            steps {
                dir('app-test') {
                    script {
                        sh 'npm ci'
                        sh 'npm run cy:verify"jenkins'
                        sh "npm run cy:run:jenkins"
                    }
                }
            }
        }
    }

    post {
        always {
            dir ('app') {
                script {
                    sh('''./scripts/stop.sh''')
                    sh('''./scripts/remove.sh''')
                }
            }

            dir ('app-frontend') {
                script {
                    sh('''./scripts/stop.sh''')
                    sh('''./scripts/remove.sh''')
                }
            }

            dir ('nginx') {
                script {
                    sh('''./scripts/stop.sh''')
                    sh('''./scripts/remove.sh''')
                }
            }
        }
    }
}
