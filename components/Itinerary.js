import React, { useEffect, useState, useRef } from "react"
import { Text, StyleSheet, Pressable, ImageBackground, View, TextInput, Image,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import activitiesActions from "../redux/actions/activitiesActions"
import itinerariesActions from "../redux/actions/itinerariesActions"
import Comments from "./Comments"
import { showMessage, hideMessage } from "react-native-flash-message"
import { withSafeAreaInsets } from "react-native-safe-area-context"


const Itinerary = (props) => {
  const { itinerary, getActivitiesByItinerary } = props
  const [comments, setComments] = useState(itinerary.comments)
  const [activities, setActivities] = useState([])
  const [itinerariesLikes, setItinerariesLikes] = useState(itinerary.likes)
  const [inputComment, setInputComment] = useState({comment: ""})
  const [collapse, setCollapse] = useState(true)
  const priceSimbol = []

  useEffect(() => {
   getActivitiesByItinerary(itinerary._id)
	  .then((res) => setActivities(res))
	  .catch((error) => (console.log(error)))
  },[props.itinerary._id])

  let condition = itinerariesLikes.includes(props.userId) ? "🖤" : "🤍" 

  const likeItinerary = () => {
        if(!props.userToken) {
            showMessage({
                message: "You must be logged to like this post!",
                description: "",
                type: "danger",
                position: "top",
                statusBarHeight: "80", 
                backgroundColor: "rebeccapurple"
            })
        }else {
        props.likeDislike(props.itinerary._id, props.userToken)
        .then(res=>{
            setItinerariesLikes(res.data.response)
        })
        .catch(error => console.log(error)) 
        } 
    }

	const toggleInfo = () => {
        setCollapse(!collapse)
    }

    const  inputHandler= (e,campo,value)=>{
        setInputComment({
            ...inputComment,
            [campo]:e || value
        })
    }

    const addNewComment = (e) => {
        if (!props.userToken){
            showMessage({
                message: "You must be logged to comment this post!",
                description: "",
                type: "danger",
                position: "top",
                statusBarHeight: "80", 
                backgroundColor: "rebeccapurple"
            })
        }else {
            if (inputComment.comment.length === 0){
                showMessage({
                    message: "You can´t send an empty comment",
                    type: "danger",
                    position: "top",
                    statusBarHeight: "80", 
                    backgroundColor: "rebeccapurple"
                })
            } else {
                props.addComment(itinerary._id, inputComment.comment, props.userToken)
                .then(res=> {
                    console.log(inputComment.comment)
                    setInputComment({comment:""})
                    setComments(res.response)})
                .catch(error=>console.log(error)) 
            }
        }
    }

	for(let i = 0; i < itinerary.price; i++) priceSimbol.push("💰")
   
  return(
    <>
		<View style={styles.containAll}>
			<View style={styles.itineraryContainer}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>{itinerary.itineraryTitle}</Text>
			</View>
				<ImageBackground resizeMode="cover" source={{uri: `https://gillone-mytinerary.herokuapp.com/${itinerary.src}` }} style={styles.imageHeader}>
				</ImageBackground>
				<View>
					<View style={styles.profileAndLike}>
						<View style={styles.profile}>
							<Image resizeMode="cover" source={{uri: `https://gillone-mytinerary.herokuapp.com/${itinerary.userPicture}`}} style={styles.userPic}/>
							<Text style={styles.authorName}>{itinerary.userName}</Text>
						</View>
						<View style={styles.likes}>
                            <Text onPress={()=>likeItinerary()}>{condition}</Text>
							<Text>{itinerariesLikes.length}</Text>
						</View>
					</View>
					<View style={styles.descriptionContainer}>
						<Text style={styles.description}>{itinerary.description}</Text>
					<View style={styles.hashtagContainer}>
						{itinerary.hashtags.map((hash) => <Text style={styles.hashtag}>#{hash}</Text>)}
					</View>
					<View style={styles.information}>
						<View>
							<Text>🕓 {itinerary.duration} hs</Text>
						</View>
						<View>
							<Text style={styles.p}>{priceSimbol}</Text>
						</View>
					</View>
					</View>

				</View>
				<View>
					{!collapse && 
					<View>
						<Text style={styles.activitiesTitle}>Activities</Text>
						<ScrollView style={styles.carouselActivity} horizontal={true}>
							{activities.map((activity) => {
									return(
										<View style={styles.activitiesContainer}>
											<ImageBackground key={activity._id} source={{uri: `https://gillone-mytinerary.herokuapp.com/${activity.src}` }} style={styles.activities} >
											</ImageBackground>
											<Text style={styles.activityTitle}>{activity.activity}</Text>
										</View>
									)
							})}
						</ScrollView>
						<View style={styles.commentContainer}>
							<ScrollView style={styles.comments}> 
								 <Comments itineraryId={itinerary._id} comments={comments} setComments={setComments}/>
							</ScrollView>
							<View style={styles.containInput}>	
								<TextInput
								placeholder={props.userToken ? "Leave a coment!" : "You have to log in to comment"}
								placeholderTextColor='#333333'
								color='black'
								style={styles.inputComment} value={inputComment.comment}
                                onChangeText={(e)=>inputHandler(e, "comment")}
								/>
                                <Pressable onPress={()=>{
                                    addNewComment()}}>
								    <Image resizeMode="cover" source={{uri: "https://i.postimg.cc/RZ5VJMn1/send.png"}} style={styles.send}/>
                                </Pressable>
							</View>	
						</View>
					</View>	
					 }
					<View style={styles.button}>
					<Pressable onPress={toggleInfo} >
						<Text style={styles.button}>{collapse ? "View More" : "View Less"}</Text>
					</Pressable>
					</View>
				</View>
			</View>
		</View>
    </>  
  )
}

mapStateToProps = state => {
    return {
        userToken: state.users.token,
        userId: state.users._id,
    }
}


const mapDispatchToProps = {
    getActivitiesByItinerary: activitiesActions.getActivitiesByItinerary,
    likeDislike: itinerariesActions.likeDislike,
    addComment: itinerariesActions.addComment,
}

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary)

const styles = StyleSheet.create({
	
	containAll:{
		width: "100%",
		alignItems: "center",
		padding: 5,
		paddingBottom: 25,
	
	},

	imageHeader:{
		height: 300,
		width: "100%",
		alignItems: "center",
		overflow: "hidden",
		borderBottomLeftRadius:  20,
		borderBottomRightRadius:  20,
		borderTopRightRadius: 10,
		borderTopLeftRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
		width: 5,
		height: 5,
		},
		shadowOpacity: 1,
		shadowRadius: 15,
		elevation: 5,
		marginBottom: 15,
		
	},

	titleContainer: {
		backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginBottom: 15,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
		borderRadius: 3
	},

	itineraryContainer:{
		width: "95%",
		justifyContent: "center",
		padding: 20,
		backgroundColor: 'rgba(255, 255, 255, 1)',
		borderRadius: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.23,
		shadowRadius: 2.62,
		elevation: 4,
	},

	hashtagContainer: {
		backgroundColor: 'rgba(255, 255, 255, 0.4)',
		flexDirection: "row",
		padding: 15,
		width: "100%",
		justifyContent: "space-between"
	},

	hashtag: {
		fontSize: 12,
	},

	information: {
		flexDirection: "row",
		width: "95%",
		justifyContent: "space-between", 
		marginVertical: 10,
		alignItems: "flex-start",
	},

	carouselActivity: {
		height: 430,
	},

	activityTitle: {
		fontFamily: "Nunito_400Regular",
		textAlign: "center",
		fontSize: 20,
	},

	activitiesTitle: {
		fontFamily: "Nunito_600SemiBold",
		textAlign: "center",
		fontSize: 25,
	},

	profileAndLike:{
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 4,
		alignItems: "center"
	},

	userPic:{
		height: 60,
		width: 60,
		borderRadius: 50
	},

	send:{
		height: 30,
		width: 30,
		marginLeft: 10
	},

	profile:{
		flexDirection: "row",
		alignItems: "center",
	},

	authorName:{
		marginLeft: 10,
		fontFamily: "Nunito_400Regular",
		fontSize: 18
	},

	descriptionContainer:{
		width: "100%",
		alignItems: "center",
		marginTop: 10,
		marginBottom: 5,
		paddingBottom: 5,
		borderBottomColor: 'grey',
        borderBottomWidth: 0.5
	},

	title:{
		fontFamily: "Nunito_400Regular",
		fontSize: 25,
		textAlign: "center",
		color: "white",
	},

	description: {
		fontFamily:"Nunito_400Regular",
		fontSize: 14,
		marginLeft: 10
	},

	inputComment: {
		fontFamily:"Nunito_400Regular",
		backgroundColor: 'lightgrey',
		width: '80%',
		borderRadius: 30,
		paddingBottom: 5,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 6,
		fontSize: 15
	},

	containInput: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		justifyContent: "center"
	},

	commentContainer: {
		paddingTop: 10,
		paddingBottom: 15,
		marginTop: 15,
		shadowColor: "#000",
		shadowOffset: {
			width: 0.5,
			height: 5,
		},
		shadowOpacity: 0.5,
		shadowRadius: 1.41,
		elevation: 1.5,
		borderRadius: 2,
		marginBottom: 15,
	},

	activities:{
		height: 400,
		width: 350,
		marginRight: 15
	},


	likes: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		width: 30,
	}, 

	button: { 
		fontFamily: "Nunito_400Regular",
		color: 'white', 
		fontSize: 15, 
		textAlign: 'center', 
		textDecorationLine: 'underline', 
		backgroundColor: "black", 
		width: "50%",
		alignSelf: "center",
		paddingVertical: 4,
		borderRadius: 3,
		textDecorationLine: "none",
	}, 

	
})
