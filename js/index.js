var siteName=document.getElementById("siteName")  //inupt kolo 
var siteURL=document.getElementById("siteURL")//inupt kolo
var searchUrlName=document.getElementById("searchUrlName");//inupt kolo

var sitList=[];
if(localStorage.getItem("sites")!=null){
sitList=JSON.parse(localStorage.getItem("sites"))
dispalyData()
}
function addSubmetUrl(){
    if(((validationSiteName())&&(validationSiteUrl()))==(true)){
        site={
            name:siteName.value,
            url:siteURL.value
        }
        sitList.push(site);
        localStorage.setItem("sites",JSON.stringify(sitList));
        dispalyData();
    
    }
    else{
        Swal.fire({
        title: `check input name or site url :
        Hint for input name :
        input name must started capital letter , any small letter from( 0 to 20) , any number form (0 to 3) 
        like as (Mahmoud1 or mahmoud1 dont use any special characters like as (@,$,$,&,*)) 
        ----------------------------------
        if you enterd the name true check in url site .
        Hint for url site input : 
        Must started with (https: or Https: ).`,
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
    rgba(0,0,123,0.4)
    url("/image/tenor.gif")
    left top
    no-repeat
   
  `
  
});
    }
    
}
function clearInput(){
    siteName.value="";
    siteURL.value="";
}
function dispalyData(){
    var data="";
    for(var i=0; i<sitList.length;i++){
        data+=`
        <div class="col-md-4  m-2 model p-3 rounded-3">
                        <div class="items text-center">
                            <img src="image/giphy.gif" alt="" class="rounded-circle img-fluid"><br>
                            <button class="btu-4">${sitList[i].name}</button> <br>
                            <a target="_blank" href="${sitList[i].url}"><button class="btu5 mt-3  " ><span><i class="fa-solid fa-eye"></i></span> Visit</button>
                            </a>
                            <button class="btu6 mt-3 ms-4" onclick="deleteSite(${i})"> <span><i class="fa-regular fa-trash-can"></i></span> Delete</button>
                        </div>
                    </div>
        `
    }
    document.getElementById("addNewDiv").innerHTML=data
}
function deleteSite(index){
    sitList.splice(index,1);
    localStorage.setItem("sites",JSON.stringify(sitList));
    dispalyData();
    //  دى منظر كدا علشان يخلى شكل الحذف كويس وينبه المستخدم انه هيحذف 
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger me-3"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });

}
function searchByName(){
    var term=searchUrlName.value;
    var data="";
    for(var i=0 ;i<sitList.length;i++){
        if(sitList[i].name.toLowerCase().includes(term.toLowerCase())){
            data+=`
        <div class="col-md-4  m-2 model p-3 rounded-3">
                        <div class="items text-center">
                            <img src="image/giphy.gif" alt="" class="rounded-circle img-fluid"><br>
                            <button class="btu-4">${sitList[i].name}</button> <br>
                            <a target="_blank" href="${sitList[i].url}"><button class="btu5 mt-3  " ><span><i class="fa-solid fa-eye"></i></span> Visit</button>
                            </a>
                            <button class="btu6 mt-3 ms-4" onclick="deleteSite(${i})"> <span><i class="fa-regular fa-trash-can"></i></span> Delete</button>
                        </div>
                    </div>
        `
    }
    document.getElementById("addNewDiv").innerHTML=data;
        }
    
    }

function validationSiteName(){
    var regex=/^[A-z][a-z]{3,20}[0-9]{0,3}$/;
    if(regex.test(siteName.value)==true){
        return true;
    }
    else{
        return false;
    }
}
function validationSiteUrl(){
    var regex=/^(https:|Https:)/;
    if(regex.test(siteURL.value)==true){
        return true;
    }
    else{
        return false;
    }
}


