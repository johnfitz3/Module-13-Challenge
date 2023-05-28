const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


  router.get('/', async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        attributes: ['id', 'tag_name'],
        include: [
          {
            model: Product,
            attributes: ['id', 'product_name']
          }
        ]
      });
      res.json(tagData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving tag data' });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const tagData = await Tag.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: Product,
            attributes: ['product_name', 'price', 'stock']
          }
        ]
      });
      if (!tagData) {
        return res.status(404).json({ message: 'No tag found with this id' });
      }

      res.json(tagData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while retrieving tag data' });
    }
  
});
router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return;
      }
      res.json(tagData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id' });
      return;
    }
    res.json(tagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
