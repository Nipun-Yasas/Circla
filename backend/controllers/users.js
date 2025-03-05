import { message } from "statuses";
import User from "../models/User";

//READ  
export const getUser = async (req, res) => {
  try {
    const {id} = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  }
  catch(err){
    req.status(500).json({message: err.message});
  }
}

export const getUserFriends = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id)=>{User.findById(id)})
        );
        const formatedFriends = friends.map(
            ({_id,firstname,lastname,occupation,location,picturePAth}) => {
                return {_id,firstname,lastname,occupation,location,picturePAth};
            }
        );
        res.status(200).json(formatedFriends);
    }
    catch(err){
        req.status(500).json({message: err.message});
    }
}

//UPDATE
export const addRemoveFriend = async (req, res) => {
    try{
        const {id, friendID} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendID);

        if (user.friends.includes(friendID)){
            user.friends = user.friends.filter((id) => id !== friendID);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else{
            user.friends.push(friendID);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id)=>{User.findById(id)})
        );
        const formatedFriends = friends.map(
            ({_id,firstname,lastname,occupation,location,picturePAth}) => {
                return {_id,firstname,lastname,occupation,location,picturePAth};
            }
        );

    }
    catch(err){
        req.status(500).json({message: err.message});
    }
}