        /**
        * gets all Json Data from a server. 
        * returns {Dictionary} - all sites
        */
         const getFromJsonServer = async()=>{
            let response = await fetch('./sites.json')
            let data = await response.json()
                if (response.status===200){
                    return data
                    }
                else{
                    alert(`${response.status}: ${response.statusText}`)
                    return null      
                    }
        }

        const colorListForBG =['#add8e6','#87ceeb', '#c0c0c0', '#f4a460']

        /**
        * Makes individual div for each site. If subdata exists, loops through it in a recusrive manner and appends the div with subdata divs
        * Takes parameters: arr (the Json data), bcColorNum (int for which color to use as a background color based on colorListForBG), id (id for div it's within. if null, assumes this is the top level div)
        */
        const HandleData = (arr, bgColorNum, id) => {
            arr.forEach((subItem)=>{
                const siteDiv = document.createElement("div")

                if (bgColorNum===4){bgColorNum=0}
                siteDiv.setAttribute('id', subItem.id)
                siteDiv.setAttribute('style', `background-color:${colorListForBG[bgColorNum]}`)

                siteDiv.innerHTML = `
    
                                            <div class="site-info">
                                                <p class="id-p">id: ${subItem.id}</p>
                                                <p class="name-p">Site Name: ${subItem.name}</p>
                                                <p class="anchor-p"><a href="https://${subItem.url}/" target="_blank">Site URL: ${subItem.name}</a></p>
                                            </div>
                                        `;

                if (id){
                    siteDiv.setAttribute('class', 'sub-site-box')
                    document.getElementById(String(id)).appendChild(siteDiv)
                }
                else{
                    siteDiv.setAttribute('class', 'main-site-box')
                    document.body.appendChild(siteDiv)
                }
            
                if (subItem.subData){
                    HandleData(subItem.subData, (bgColorNum+1), subItem.id)
                } 
            })
        }


        /**
        * runs getFromJsonServer, followed by HandleData with the Json from the server
        * 
        */
        const setEveryDivWithServerData = async()=>{
            let theData = await getFromJsonServer()
            if (theData){
                HandleData(theData, 0, null)
            }
        }


        setEveryDivWithServerData()