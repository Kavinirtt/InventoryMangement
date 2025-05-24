const productService = require('../services/product.service');

exports.createProduct = async (req, res) => {
    const product = req.body;

    product.created_by = req.user.userId;
    if (!product.name || !product.product_code || !product.created_by) {
        return res.status(400).json({ message: 'Missing required product fields' });
    }
    try {
        const result = await productService.createProduct(product);
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    } catch (error) {
        console.error('Create Product Error:', error);
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
};

exports.getAll = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json({
            status: true,
            message: 'Products fetched successfully',
            data: products
        });
    } catch (error) {
        console.error('Get All Products Error:', error);
        res.status(500).json({
            status: false,
            message: 'Failed to fetch products',
            error: error.message
        });
    }
};


exports.updateProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    data.updated_by = req.user.userId;

    if (!id || !data.updated_by) {
        return res.status(400).json({ message: 'Product ID and updated_by are required' });
    }
    try {
        await productService.updateProduct(id, data);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Update Product Error:', error);
        res.status(500).json({ message: 'Failed to update product', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    const id = req.params.id;
    const deleted_by = req.user.userId;
    if (!id || !deleted_by) {
        return res.status(400).json({ message: 'Product ID and deleted_by are required' });
    }
    try {
        await productService.deleteProduct(id, deleted_by);
        res.status(200).json({ message: 'Product marked as deleted' });
    } catch (error) {
        console.error('Delete Product Error:', error);
        res.status(500).json({ message: 'Failed to delete product', error: error.message });
    }
};
