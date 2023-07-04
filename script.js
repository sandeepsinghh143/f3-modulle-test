const getDataBtn=document.getElementById("get-data");
let mainContent=document.getElementById("generated-data");
getDataBtn.addEventListener("click",function(){
    getDataBtn.style.display="none";
    mainContent.style.display="block";
    const ip=document.getElementById('ip-address').innerText;
    fetch(`https://ipinfo.io/${ip}?token=8929c53974a701`)
    .then(response=>response.json())
    .then(data=>{
        const lat=document.getElementById('lat');
        lat.innerText=data.loc.split(',')[0];

        const city=document.getElementById('city');
        city.innerText=data.city;

        const org=document.getElementById('org');
        org.innerText=data.org;

        const long=document.getElementById('long');
        long.innerText=data.loc.split(',')[1];

        const region=document.getElementById('region');
        region.innerText=data.region;

        const host=document.getElementById('host');
        host.innerText=location.hostname;

        const iframe=document.getElementById('map-iframe');
        iframe.src=`https://maps.google.com/maps?q=${data.loc.split(',')[0]},${data.loc.split(',')[1]}&output=embed`;

        const p1=document.getElementById("timezone");
        p1.innerText=data.timezone;
        const currentTime = new Date().toLocaleString('en-US', { timeZone: data.timezone });
        const p2=document.getElementById("date-time");
        p2.innerText=currentTime;
        const p3=document.getElementById("pincode");
        p3.innerText=data.postal;
        getPinData(data.postal);
    })
    .catch(err=>console.log("Error : " +err));
});

async function getPinData(pinNo){
    try{
        const response = await fetch(`https://api.postalpincode.in/pincode/${pinNo}`);
        const data= await response.json();
        let postalData=document.getElementById("postalData");
        const p4=document.getElementById("message");
        p4.innerText=data[0].Message;
       for(let i=0; i<data[0].PostOffice.length; i++){
            let state=data[0].PostOffice[i];
            console.log(state);
            let div=document.createElement("div");
            div.className="postOffice";
            div.innerHTML=`<p>Name : ${state.Name}</p><p>Branch Type : ${state.BranchType}</p><p> Delivery Status : ${state.DeliveryStatus}</p><p>District : ${state.District}</p><p>Division : ${state.Division}</p>`;
            postalData.append(div);
    }
    }
    catch(error){
        throw new Error("Error : " + error.message);
    }
}

function filterPostOffices(){
        const searchBox = document.getElementById('filter');
		const filter = searchBox.value.toUpperCase();
		const postOfficeList = document.getElementById('postalData');
		const postOffices = postOfficeList.getElementsByClassName('postOffice');

		for (let i = 0; i < postOffices.length; i++) {
			const postOffice = postOffices[i];
			const text = postOffice.textContent.toUpperCase();
			if (text.indexOf(filter) > -1) {
				postOffice.style.display = '';
			} else {
				postOffice.style.display = 'none';
			}
		}
}


const searchBox=document.getElementById("filter");
searchBox.addEventListener("keyup",filterPostOffices);
const searchButton=document.getElementById("searchBtn");
searchButton.addEventListener("click",searchPostOffices2);