import { Router } from "express";
import { sample_plat, sample_tags } from "../data";
import asyncHandler from "express-async-handler";
import { PlatModel } from "../models/plat.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
         const platsCount = await PlatModel.countDocuments();
         if(platsCount > 0){
             res.send("Seed is already done");
             return;
         }
         await PlatModel.create(sample_plat);
         res.send("Seed is already done"); 
     }
 ));

router.get("/", asyncHandler(
    async (req, res) => {
        const plats = await PlatModel.find();
          res.send(plats);
    }
));

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const plats = await PlatModel.find({name: {$regex:searchRegex}});
        res.send(plats);
    }
))

router.get("/tags", asyncHandler(async (req, res) => {
    const tags = await PlatModel.aggregate([
        { $unwind: '$tags' },
        { $group: { _id: '$tags', count: { $sum: 1 } } },
        { $project: { _id: 0, name: '$_id', count: '$count' } }
    ]).sort({ count: -1 });

    const all = {
        name: 'all',
        count: await PlatModel.countDocuments()
    };

    tags.unshift(all);
    res.send(tags);
}));



// Route pour récupérer les plats par tag
router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
        const plats = await PlatModel.find({tags: req.params.tagName})
        res.send(plats);
    }
));

router.get("/:platId", asyncHandler(
    async (req,res) => {
        const plat = await PlatModel.findById(req.params.platId)
        res.send(plat); // Envía el objeto Plat directement
    }
));
export default router;