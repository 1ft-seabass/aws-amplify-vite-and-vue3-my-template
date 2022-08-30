import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Amplify Add
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

createApp(App).mount('#app')
