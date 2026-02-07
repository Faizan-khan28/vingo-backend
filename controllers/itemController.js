import Item from "../models/itemModel.js";
import Shop from "../models/shopModel.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const addItem = async  (req,res) => {
    try {
        const {name,category,foodType,price} = req.body
        let image;
        if(req.file) {
          image = await uploadOnCloudinary(req.file.path)
        }
        const shop = Shop.findOne({owner:req.userId})
        if(!shop) {
            return res.status(400).json({message: "shop not found"})
        }
        const item = await Item.create({
            name,category,foodType,price,image,shop:shop._id,
        })
        return res.status(201).json(item)
    } catch (error) {
        return res.status(500).json({message: `error in addItem ${error}`})
    }
}

export const editItem = async  (req,res) => {
   try {
    const itemId = req.params.itemId
    const {name,category,foodType,price} = req.body
    let image;
    if(req.file) {
        image = await uploadOnCloudinary(req.file.path)
    }
    const item = Item.findByIdAndUpdate(itemId,{
        name,category,foodType,price,image
    },{new:true})

    if(!item) {
        return res.status(400).json({message:`item not found`})
    }
    return res.status(200).json({message:"item edit successfully"})
   } catch (error) {
    return res.status(500).json({message:`error in edit item ${error}`})
   }
}