import Product from '../models/product.js';

export const addProduct = async (req, res) => {
    try {
        const productId = req.body.product_id;
        const name = req.body.name;
        const description = req.body.description;
        const image = req.body.image;
        const category = req.body.category;
        const subCategory = req.body.sub_category;
        const affiliate_links = req.body.affiliateLinks;

        console.log(affiliate_links);

        const dataArray = affiliate_links.split(',');
        console.log(dataArray);

        let product = await Product.findOne({product_id: productId});

        if (!product) {
            product = new Product({ 
                "product_id": productId,
                "name": name,
                "description": description,
                "image": image,
                "category": category,
                "subCategory": subCategory,
                "affiliateLinks": dataArray
             });
            await product.save();
            return res.status(200).json({ success: true, message: "Profile Created Successfully. "});
        }

        res.status(200).json({ success: false, message: "Profile Already Created " });

    }
    catch (e) {
        console.log(e);
        res.status(500).json({ success: false, message: "Check console..." });
    }
}