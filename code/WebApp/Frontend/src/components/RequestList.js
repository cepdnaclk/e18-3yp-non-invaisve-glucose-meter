import React from "react";
import RequestListItem from "./RequestListItem";

export default function RequestList(props){

    let newelel;
    newelel = RequestListItem(props[0],1);
    function listcomponent(props){
        console.log("2",props)
        for (let index = 1; index < props.length; index++) {
            let element = props[index];
            let newelel2 = RequestListItem(element,index+1);
            //console.log(index,requestListItem(element) )
            newelel = <div> {newelel}<div>{newelel2}</div></div>

            
        }
        //let output1 =requestListItem(props[0])
        //let output2 =requestListItem(props[1])

        return (
            <div>
                {newelel}
            </div>
        )
        
    
    }


    return(
        <div>

            {listcomponent(props)}

        </div>

    )

}