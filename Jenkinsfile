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
                        sh('''./scripts/build.sh''')
                        sh('''./scripts/start.sh''')
                    }
                }
            }
        }

        stage('Test') {
            steps {
                dir('app-test') {
                    script {
                        sh('''./scripts/run.sh''')
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
