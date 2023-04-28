pipeline {

	agent any

	environment {
	    registry = "darshan4163264/spebackend"
	    registryfront = "darshan4163264/spefrontend"
	    registryCredential = 'dockerId'
	    dockerImage = ''
	    dockerImageReact = ''
	}

    stages {
        stage('Git Pull') {
            steps {
				git url: 'https://github.com/duston04/SPE_MAJOR.git',
				branch: 'master'
            }
        }

        stage("React installations"){
            steps{
                dir('frontend/frontend'){
                    sh 'echo hello'
                    sh 'npm install'
                }
            }
        }

        stage('Maven Build') {
            steps {
                sh 'mvn clean install'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build registry
                }
                script{
                    sh 'cd /frontend/frontend'
                    dockerImageReact = docker.build registryfront
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script{
                    docker.withRegistry( '', registryCredential ) {
                        dockerImage.push()
                    }

                    docker.withRegistry( '', registryCredential) {
                        dockerImageReact.push()
                    }
                }
            }
        }

        stage('Deploy Image Ansible'){
            steps {
                ansiblePlaybook becomeUser: null, colorized: true, disableHostKeyChecking: true, installation: 'Ansible', inventory: 'inventory', playbook: 'pb.yml', sudoUser: null
            }
        }

    }
}