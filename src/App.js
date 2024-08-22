import {useState} from 'react';

let dum_arr=[
    {id:1,Name:"Kishorer",img_url:"null",balance:120},
    {id:2,Name:"raju",img_url:"null",balance:0},
    {id:3,Name:"mega",img_url:"null",balance:-90}
];
function FriendsList({fun,fun_val}){
    return(
        <ul className='mb-[40px]'>
           {fun.map((e)=>{
            return(
                <li key={e.id}>
                    <span className='block'>{e.Name}</span>
                    {e.balance===0?`You and ${e.Name} are Squared`:e.balance>0?`You Lend ${e.Name} \$${e.balance}`:`You Owe ${e.Name} \$${Math.abs(e.balance)}`} 
                    <button className='block bg-slate-400 rounded-lg w-[50px]' onClick={()=>fun_val(e.id)}>ADD</button>               
                </li>
            )
           })} 
        </ul>
    )
}

function AddFriends({fun,val,fun_val}){
    const [name,setName]=useState("");

    
    function addFri(e){
        e.preventDefault()
        let obj={
            id:new Date().getTime(),
            Name:name,
            img_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfls5j0ZSARyc_UvA-5FFqlNcunMlcFtYEZw&s",
            balance:0
        }
        setName("");
        fun(obj);
        fun_val();
    }
    return(
        <div>
        {val?
        <form onSubmit={(e)=>addFri(e)}>
            <div>
            <p className='inline-block mr-[10px]'>NAME:</p>
            <input className="border-[3px] border-gray-900" type="text" value={name} onChange={(e)=>setName(e.target.value)}></input>
            </div>
            <div className='mt-[10px]'>
            <p className='inline-block mr-[10px]'>Image Url:</p>
            <input className="border-[3px] border-gray-900" type="text" value="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfls5j0ZSARyc_UvA-5FFqlNcunMlcFtYEZw&s"></input>
            </div>
            <button className='bg-red-500 rounded-lg w-[50px] mt-[20px]' >ADD</button>            
        </form>:<button onClick={fun_val}>ADD</button>}
        </div>
    )
}


function Form({fun,val,handle}){
    const [local_bill,setLocal_bill]=useState(0);
    const [local_split,setLocal_split]=useState(0);
    const [local_paid,setLocal_paid]=useState(0);
    function local(e){
        // console.log("hii");
        e.preventDefault();
        if(local_bill>0){
            if(local_paid===0 && local_bill>=local_split){
                val.balance=local_bill-local_split;
            }else if(local_paid===1 && local_bill>=local_split){
                val.balance=-local_split;
            }else{
                return;
            }
        }
        handle(val)
    }
    return(
        <div>
            {fun!==0?
        <div>
            <p>Your split with {val.Name}</p>
        <form onSubmit={(e)=>local(e)}>
            <div>
            <label >Bill value</label>
            <input className='border-[2px] border-black ml-[10px]' type="text" value={local_bill} onChange={(e)=>setLocal_bill(Number(e.target.value))}></input>
            </div>
            <div className='mt-[20px]'>
                <label>Your split</label>
                <input className='border-[2px] border-black ml-[10px]' type="text" value={local_split} onChange={(e)=>setLocal_split(Number(e.target.value))}></input>
            </div>
            <div className='mt-[20px]'>
                <label>Selected's split</label>
                <input className='border-[2px] border-black ml-[10px]' type="text" value={local_bill-local_split} readOnly></input>
            </div>
            <div className='mt-[20px]'>
                <label>Who paid?</label>
                <select className='border-[2px] border-black ml-[10px]' value={local_paid} onChange={(e)=>setLocal_paid(Number(e.target.value))}>
                    <option value={0}>You?</option>
                    <option value={1}>{val.Name}?</option>
                </select>
                <button className='block bg-lime-300 w-[80px] rounded-xl mt-[30px]'>SUBMIT</button>
            </div>

        </form>
        </div>:<p>Select a friend</p>}
        </div>
    )
}
export default function App(){
    const [friends,setFriends]=useState(dum_arr);
    const [dispAdd,setDispApp]=useState(false);
    const [id,setId]=useState(0);
    
    let form_arr_dum=friends.filter(e=>e.id===id);
    let form_arr=form_arr_dum[0];
    console.log(form_arr)
    function handleId(idd){
        setId(idd);
    }
    function handleFriends(obj){
        console.log(obj.Name)
        for(let i=0;i<friends.length;i++){
            
            if(obj.Name===friends[i].Name || obj.Name===""){
                return;
            }
        }
        setFriends((f)=>[...f,obj]);
    }

    function handleDisp(){
        setDispApp(!dispAdd);
    }
    function handleForm(obj){
        let arr_handle_form=friends.map(e=>e.id===obj.id?obj:e);
        setFriends(arr_handle_form);
        setId(0);
    }
   return (
   <div>
    <FriendsList fun={friends} fun_val={handleId}/>
    <AddFriends fun={handleFriends} val={dispAdd} fun_val={handleDisp}/>
    <Form fun={id} val={form_arr} key={id} handle={handleForm}/>
    {/* {console.log(friends)} */}
   </div>
   );
}