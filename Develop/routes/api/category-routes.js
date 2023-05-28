const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint


  // find all categories
  router.get('/', async (req, res) => {
    try {
      // Find all categories and include their associated Products
      const categories = await Category.findAll({
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
        ]
      });
      res.status(200).json(categories);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  });


router.get('/:id', async (req, res) => {
  try {
    // Find one category by its `id` value and include its associated Products
    const category = await Category.findOne({
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    if (!category) {
      res.status(404).json({ message: 'No categories found' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
  .then(categoryData => res.json(categoryData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
  }
});    
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(categoryData => {
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id' });
      return;
    }
    res.json(categoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  
  });
  


module.exports = router;
