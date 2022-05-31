import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',  
  styles: [
    `
    .search_container{     
     @apply w-full h-16 flex justify-start items-center fixed top-0 left-0 z-10;
     background-color:#323a45;     
    }
    .search_form{
      @apply w-full max-w-7xl my-0 mx-auto;            
    }
    .search_input{
      @apply ml-3 p-3 w-80 rounded-tl-md rounded-bl-md border-0 outline-0;            
    }
    .search_input[placeholder]{
      @apply text-black;
    }
    .search_button{
      @apply outline-0 border-0 rounded-tr-md rounded-br-md p-3 text-white font-bold cursor-pointer;
      background:#3f51b5;      
      border-left:1px solid rgba(0,0,0,0.3);                  
      transition-duration:0.3s;      
    }
    .search_button:hover{
      @apply bg-white;
      color:#3f51b5;      
      border: 1px solid #3f51b5;
    }
    .logo{
      @apply ml-3 text-white font-bold cursor-pointer no-underline	;      
    }
    `
  ],
  template: `
    <div class='search_container' style="color:white">
    <form (ngSubmit)='onFormSubmit()' [formGroup]='search_form' class='search_form'>
    <span class='logo' routerLink="/">Homepage</span>
    <input formControlName='search' class='search_input' [placeholder]='form_placeholder_text'/>
    <button class='search_button' [innerHTML]='search_button_text' type='submit'></button>
    </form>    
    </div>
  `,
})
export class SearchBarComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }
  form_placeholder_text: string = 'Search 500.000+ games'
  search_button_text: string = 'Search'
  search_form: FormGroup = this.formBuilder.group({
    search: ['', Validators.compose([Validators.required, Validators.maxLength(50)])]
  })

  get search_form_value() {
    return this.search_form.value
  }

  get search_value() {
    return this.search_form.get('search')
  }

  onFormSubmit(){
    this.router.navigate(['search',this.search_value?.value])    
  }

}
