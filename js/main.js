/*import Vue from 'vue'*/
const NotFound = { template: '<p>Page not found</p>' }

const Home = {
 template: '<p class="myClass">home page by {{name}}</p>',
  data(){
    return{
      name: "Auna"
    }
  } 
}

const About = { 
  template: '<p>About page ({{age}})</p>',
  data(){
    return{
      age: "Musbell"
    }
  } 
}

const Dashboard = {
  template: `
  <p>Hello {{fullName}}</p>
  `,
  data(){
    return{
      Fname: "Shaheed",
      Lname: "Muhammad"
    }},
    computed: {
      fullName(){
        return this.Fname + ' ' + this.Lname
      }
    }
  }

const Scan = {
  	template: `<qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
  	`,
  	methods: {
  		onDecode(content){
  			window.open(content)
  		},
  		onInit(promise){
  			promise.then(()=>{
  				console.log('Successfully initialized')
  			})
  			.catch(error => {
        	if (error.name === 'NotAllowedError') {
        	  this.errorMessage = 'Hey! I need access to your camera'
        	} else if (error.name === 'NotFoundError') {
        	  this.errorMessage = 'Do you even have a camera on your device?'
        	} else if (error.name === 'NotSupportedError') {
        	  this.errorMessage = 'Seems like this page is served in non-secure context (HTTPS, localhost or file://)'
        	} else if (error.name === 'NotReadableError') {
        	  this.errorMessage = 'Couldn\'t access your camera. Is it already in use?'
        	} else if (error.name === 'OverconstrainedError') {
        	  this.errorMessage = 'Constraints don\'t match any installed camera. Did you asked for the front camera although there is none?'
        	} else {
        	  this.errorMessage = 'UNKNOWN ERROR: ' + error.message
        	}
      	})

  		}
	}
}


const routes = [
  {path: '/home', component: Home},
  {path: '/about', component: About},
  {path: '/dashboard', component: Dashboard},
  {path: '/scan', component: Scan}
]

const router = new VueRouter({
  /*mode: 'history',*/
  routes
})

new Vue({
	el: '#app',
	router,
	data: {
		message: ""
	},
	updated(){
		this.message = window.location.href
	}
})