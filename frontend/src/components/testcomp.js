import React,{Component} from 'react';
import "../styles/test.css";

class testcomp extends Component{
   test(e){
       var element = document.getElementById("menu2");
        element.toggle();
        e.stopPropagation();
        e.preventDefault();
      };
    render(){
        return (
            <div>
               <div class="dropdown">
		<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		  Sort table
		</button>
		<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <div class="btn-group dropright">
  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Dropright
  </button>
  <div class="dropdown-menu">
   
  </div>
</div>
		  <a class="dropdown-item" href="#">Ime Prezime</a>
		  <a class="dropdown-item" href="#">Poc Odmora</a>
		  <a class="dropdown-item" href="#">Kraj Odmora</a>
		  <a class="dropdown-item" href="#">PRvi dan</a>
		</div>
	  </div>
            </div>
            )
    }
}

export default testcomp;


