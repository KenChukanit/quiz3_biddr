import React,{useState} from 'react'
import {Bid} from '../data/request';
import FormErrors from './FormErrors';

function NewBidForm(props) {
    const [bidPrice,setBidPrice] = useState('');
    const [errors,setErrors]=useState({});

    const id = props.id
    const handleSubmit = (event)=>{
        event.preventDefault();
        const formData= new FormData(event.currentTarget);
        const params={
            bid_price: formData.get('bid_price'),
        }
        createBid(params,id);
        event.currentTarget.reset();
    }

    const createBid=(params,id)=>{
        const price = params.bid_price;
        const reserve_price = props.reserve_price;
        Bid.create(params,id)
        .then((bid)=>{
            if(bid.errors){
                setErrors(bid.errors)
            }
            if(bid.id){
                props.loadAuction()
                props.checkMetReservePrice(price,reserve_price)
                setErrors({})
                props.history.push(`/auctions/${id}`)
            }
           
        })
    }
    return (
        <div>{!props.currentUser?(<h3>Please sign in to Bid</h3>):(
            <form onSubmit={event=>handleSubmit(event)}>
                <div>
                <FormErrors errors={errors} forField='bid_price'/>
                    <input name='bid_price' id='bid_price' value={bidPrice} onChange={e=>setBidPrice(e.target.value)}/>
                </div>
                <input type='submit' value='Bid' className="btn btn-primary mt-4"/>
            </form>)}
        </div>
    )
}

export default NewBidForm
