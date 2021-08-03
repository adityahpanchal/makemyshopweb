import { useState } from "react"
import StarRatings from "react-star-ratings/build/star-ratings"
import { API } from "../../../Backend"

const Review = ({reviewData, setReviewData, prd, uid, token, getReviews}) =>{

    const [myRating, setMyRating] = useState(0)
    const [feedback, setFeedback] = useState('')
    const [loading, setLoading] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [error, setError] = useState('')

    const addReview = async() =>{
        
        setLoading(true)
        console.log(myRating)
        if(myRating === 0){
            setError('Please give stars')
            setLoading(false)
            return
        }

        if(feedback === ''){
            setError('Please Write your feedback')
            setLoading(false)
            return
        }
        
        fetch(`${API}/add/review/${uid}/${prd}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({stars: myRating, feedback: feedback})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                const reviews = await getReviews()
                setReviewData(reviews)
                setLoading(false)
                console.log('added review') 
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const saveEdit = async() =>{
        setLoading(true)

        if(myRating === ''){
            setError('Please give stars')
            setLoading(false)
            return
        }

        if(feedback === ''){
            setError('Please Write your feedback')
            setLoading(false)
            return
        }
        
        fetch(`${API}/update/review/${uid}/${prd}`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({stars: myRating, feedback: feedback})
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                const reviews = await getReviews()
                setReviewData(reviews)
                setLoading(false)
                setIsEdit(false)
                setMyRating(0)
                console.log('edited review') 
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    const deleteReview = async() =>{
        fetch(`${API}/delete/review/${uid}/${prd}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then((response) =>{
            return response.json()
        }).then(async(data) =>{
            if(data.error){
                setLoading(false)
                console.log(data.error)
            }else{
                const reviews = await getReviews()
                setReviewData(reviews)
                setLoading(false)
                setIsEdit(false)
                setMyRating(0)
                setFeedback('')
                console.log('deleted review') 
            }
        }).catch((err) =>{
            console.log(err)
        })
    }

    return (
        <div className="col-md-6">
            <div className="card mb-3">
                <h3 className="py-3 text-center">Reviews</h3>
            </div>
            {
                reviewData.totalReviews !== 0 &&
                <div className="card mb-3 ">
                    <h5 className="py-3 text-center">Average Rating</h5>
                    <div className="mx-auto pb-3">
                        <StarRatings
                            rating={reviewData.averageRating}
                            starRatedColor="#D95A00"
                            starDimension="23px"
                            starSpacing="3px"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                </div>
            }


            {/* my review */}
            {//edit///
                reviewData.hasMyReview && !isEdit &&
                <div className="card mb-3 py-3">
                    <h5 className="py-3 text-center">Your Review</h5>
                    <div className="mx-auto pb-3">
                        <StarRatings
                            rating={reviewData.myReview.stars}
                            starRatedColor="#D95A00"
                            starDimension="23px"
                            starSpacing="3px"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                    <p class="card-text pt-1 text-center" style={{fontSize: 20}}>{reviewData.myReview.feedback}</p>
                   
                    <div className="row mx-auto">
                        <button className="btn btn-light  mx-3" onClick={() => {setIsEdit(true); setMyRating(reviewData.myReview.stars); setFeedback(reviewData.myReview.feedback)}}><i className="fas fa-pen text-warning"></i></button>
                        <button className="btn btn-light mx-3" onClick={deleteReview}><i className="fas fa-trash text-danger"></i></button>
                    </div>
                  
                </div>
            }
            {//edit///
                reviewData.hasMyReview && isEdit && 
                <div className="card mb-3 py-3">
                      {error !== "" && <h6 className="text-center text-danger h6 py-1">{error}</h6>}
                    <h5 className="py-3 text-center">Edit Your Review</h5>
                    <div className="mx-auto pb-3">
                        <StarRatings
                            rating={myRating}
                            changeRating={(v) => {setMyRating(v); setError('')}} 
                            starRatedColor="#D95A00"
                            starDimension="23px"
                            starSpacing="3px"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                    <textarea className="form-control col-9 mx-auto" onChange={(e) => {setFeedback(e.target.value); setError('')}} value={feedback}>{feedback}</textarea>
                   
                    <div className="row mx-auto py-3">
                        <button className="btn btn-outline-success  mx-3" onClick={saveEdit}><span class="text">{loading ? 'wait a sec' : 'Save'}</span> <i className="fas fa-check text-success"></i></button>
                        <button className="btn btn-outline-danger mx-3" onClick={() => {setIsEdit(false); setMyRating(reviewData.myReview.stars); setFeedback(reviewData.myReview.feedback)}}><span class="text">{loading ? 'wait a sec' : 'Delete'}</span> <i className="fas fa-times text-danger"></i></button>
                    </div>
                  
                </div>
            }
            {
                !reviewData.hasMyReview && 
                <div className="card mb-3 py-3">
                    {error !== "" && <h6 className="text-center text-danger h6 py-1">{error}</h6>}
                    <h5 className="py-3 text-center">Give Your Review</h5>
                    <div className="mx-auto pb-3">
                        <StarRatings
                            rating={myRating}
                            changeRating={(v) => {setMyRating(v); setError('')}}
                            starRatedColor="#D95A00"
                            starDimension="23px"
                            starSpacing="3px"
                            numberOfStars={5}
                            name='rating'
                        />
                    </div>
                    <textarea className="form-control col-9 mx-auto" onChange={(e) => {setFeedback(e.target.value); setError('')}} value={feedback}>{feedback}</textarea>
                    <button className="btn btn-primary col-2 mx-auto my-3" onClick={addReview}>{loading ? 'wait a sec' : 'Submit'}</button>
                </div>
            }
            {/* my review */}



            <div className="card">
                {
                    reviewData.totalReviews === 0 &&
                    <h4 className="text-center py-3">No Reviews</h4>
                }
                {
                    reviewData.totalReviews === 1 && reviewData.hasMyReview &&
                    <h4 className="text-center py-3">No More Reviews</h4>
                }
                {

                    reviewData.totalReviews !== 0 &&
                    reviewData.reviews.map((r) =>{

                        let date = new Date(r.createdAt)

                        return(
                            <div class="col py-1">
                                <div class="card">
                                    <div class="card-body">
                                        <div className="row" style={{marginLeft: 3}}>
                                            <h5 class="card-title">{`${r.userId.firstname} ${r.userId.lastname}`}</h5>
                                            <h6 class="my-1 ml-3">({`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`})</h6>
                                        </div>
                                        <div>
                                            <StarRatings
                                                rating={r.stars}
                                                starRatedColor="#D95A00"
                                                starDimension="20px"
                                                starSpacing="3px"
                                                numberOfStars={5}
                                                name='rating'
                                            />
                                        </div>
                                        <p class="card-text pt-1" style={{fontSize: 20}}>{r.feedback}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Review