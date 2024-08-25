const express=require("express");//import express
const movierouter=express.Router();


const Movie=require("../../db/schemas/movieschemas")




    movierouter.get('/',async(req,res)=>{
        const queryparams=req.query;
        const filters={};
        if(queryparams.name){
            filters.name={
                $regex:`^${queryparams.name}`,
                $options:"i"
            }
        }
        if(queryparams.rating){
            filters.rating={
                $gte:parseFloat(queryparams.rating)
            }
        }

        const movies=await Movie.find(filters)
        res.json(movies)    
}) 
   movierouter.post("/",async(req,res)=>{
    try{
        const  moviesData=req.body;
        const newMovie=new Movie(moviesData);//movie schema
        await newMovie.save();

        res.json({
        message:"Movie added succesfully"

        });
    }catch(error){
        console.log(error);
        res.status(500).json({
        message:"internet server error",
    });
}
})   
   movierouter.put("/:id",async(req,res)=>{
    try{
        const movieIDA=req.params.id;
        const updatedMovdata=req.body;
        const response=await Movie.findByIdAndUpdate(movieIDA,updatedMovdata)
        res.json({
            message:"movie updated succesfully"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"internal error"
        })
    }

})
    movierouter.delete("/:id",async(req,res)=>{
    try{
        const movieIDA=req.params.id;
        const deletedMovdata=req.body;
        const response=await Movie.findByIdAndDelete(movieIDA,deletedMovdata)
        res.json({
            message:"movie deleted succesfully"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"internal error"
        })
    }
})
movierouter.get('/:id', async (req, res) => {
    try {
        const movieID = req.params.id;
        const movie = await Movie.findById(movieID);

        if (!movie) {
            return res.status(404).json({
                message: "Movie not found"
            });
        }

        res.json(movie);
    } catch (error) {
        if (error.kind === "ObjectId") {
            res.status(404).json({
                message: "Movie not found"
            });
        } else {
            console.error(error);
            res.status(500).json({
                message: "Internal server error"
            });
        }
    }
});

    
module.exports=movierouter;
        
        
        
    





