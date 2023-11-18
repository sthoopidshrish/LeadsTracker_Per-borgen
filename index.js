let myLeads = []
let oldLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("button-el")
const ulEl = document.getElementById("ul-el")
const leadfromLocalStorage = localStorage.getItem("myLeads")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

if(leadfromLocalStorage) {
    myLeads = JSON.parse(leadfromLocalStorage)          //if the value of leadsfromLocalStorage is truthy execute the statement
    render(myLeads)
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log(tabs)
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener('dblclick', function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
    
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    
});

function render(leads){
    let listItems = ""
    for(let i = 0;i<leads.length;i++)
{
    listItems += `<li>
    <a href='${leads[i]}' target='_blank'>
        ${leads[i]}
    </a>
</li>
`

}
ulEl.innerHTML = listItems

}







