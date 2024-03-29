zoomList allows you to make a sleek looking list of images that will be zoomed to
twice their size when the user hovers over the image.

To use it, you need to have an unordered list with the 'zoomList'-css-class inside
a div with the zoomListContainer-css-class:

```html
<div class="zoomListContainer">
  <ul class="zoomList"></ul>
</div>
```

You need to explicitly specify the with of the list in your css, to allow the items
to flow correctly. (The container takes care of any leading margins on the left outermost items).
The width should be the with of the unzoomed item plus it's margin * number of items per row.
For instance, if we wish to have 4 items per row, with a width of 140px plus a margin of 4px, the
width of the list should be: (140 + 4) * 4 = 304

```css
#my_list { width: 304px }
```

Every item in the list must contain equally sized image-tags within a link-tag:

```html
<ul class="zoomList">
  <li>
    <a href="/"><img src="images/a.jpg"></a>
  </li>
</ul>
```

You must specify the size and margin of the items and it's images in your css.
The size of the items and the images must be equal.

```css
#my_list li { width: 140px; height: 140px; margin: 0px 15px 15px 0px; }
#my_list li img { width: 140px; height: 140px; }
```

Optionally you may have a caption in the item in the form of a div with the
caption-css-class:

```html
<li>
  <a href="/"><img src="images/a.jpg"></a>
  <div class="caption">
    This is a caption
  </div>
</li>
```

Finally you need to setup the list to bee zoomable:

```javascript
$(document).ready(function() {
  $('#my_list').zoomList();
});
```

Protip: Make sure that the resolution of the images in the list is twice as big
as it is shown in it's unzoomed state, otherwise they will look blurry when zoomed.
Do this by simply making the resolution of the image twice the size but forcing the
size of the image to be half-size via css.
