(function( $ ) {
  $.fn.zoomList = function() {

    var firstItem = this.find('li');
    var list = this;

    // First we need to figure out the width, height and margin of the items in the list
    var itemWidth = firstItem.width();
    var itemHeight = firstItem.height();
    var itemHorizontalMargin = parseInt(firstItem.css('margin-right'), 10);
    var itemVerticalMargin = parseInt(firstItem.css('margin-bottom'), 10);

    // Then we calculate the expanded size of the items.
    var expandedWidth = itemWidth * 2 + itemHorizontalMargin;
    var expandedHeight = itemHeight * 2 + itemVerticalMargin;

    // Then we add hover-areas for all items in the list.
    this.find('li').each(function(index, element) {
      var hoverArea = $('<div class="hoverArea"/>');
      hoverArea.width(itemWidth);
      hoverArea.height(itemHeight);
      $(element).append(hoverArea);
    });

    // When the user clicks the hoverArea, we should follow the underlying link.
    this.find('li .hoverArea').click(function() {
      var listItem = $(this).parent();
      window.location = listItem.find('a').attr('href');
    });

    // When the user hovers over the hoverArea, we should expand the image and
    // show the caption.
    this.find('li .hoverArea').hover(function() {
      var listItem = $(this).parent();

      // Place the image on top of the other images
      listItem.find('img').css('zIndex', '2');

      // If the item is one of the left-outer-most items, we need to zoom to the left
      // and if it's in the last row, we need to zoom up.
      var currentPosition = listItem.position()
      var moveLeft = 0;
      var moveTop = 0;

      if (currentPosition.left >= list.width() - (itemWidth + itemHorizontalMargin))
        moveLeft = -itemWidth - itemHorizontalMargin;
      if (currentPosition.top >= list.height() - (itemHeight + itemVerticalMargin))
        moveTop = -itemHeight - itemVerticalMargin;

      // Zoom the image and the caption if there is one.
      listItem.find('img').stop(false,true).animate({'width':expandedWidth, 'height':expandedHeight, 'top':moveTop, 'left':moveLeft}, {duration:200});
      listItem.find('.caption').stop(false,true).animate({'width':expandedWidth, 'height':expandedHeight, 'top':moveTop, 'left':moveLeft}, {duration:200});

      // Display the caption if there is one.
      listItem.find('div.caption').stop(false,true).fadeIn(200);
    },
    function() {
      var hoverArea = $(this);
      var listItem = $(this).parent();

      // Reset the image
      listItem.find('img').stop(false,true).animate(
        {
          'width': itemWidth,
          'height': itemHeight,
          'top': '0',
          'left': '0'
        }, {
          duration:100,
          complete: function() {
            // Reset z-index
            listItem.find('img').css('zIndex', '1');
          }
      });

      // Hide the caption
      listItem.find('div.caption').stop(false,true).fadeOut(200);
    });

    // Maintain chainability;
    return this;
  };
})( jQuery );
