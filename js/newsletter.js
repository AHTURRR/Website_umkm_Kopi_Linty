document.addEventListener("DOMContentLoaded", () => {
    const chechkbox = document.getElementById("langganan");

    checkbox.addEventListener("change", () => {
        if(chechkbox.checked){
            alert("terimakasih telah berlangganan newsleter kami !!");
        }else{
            alert("anda telah berhenti berlangganan newsletter kami !!")
        }
    })

})