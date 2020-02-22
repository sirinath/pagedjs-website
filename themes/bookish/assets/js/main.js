import { totalmem } from "os";
import { lstat } from "fs";

function halftone(image) {
  // try to create a WebGL canvas (will fail if WebGL isn't supported)
  try {
    var canvas = fx.canvas();
  } catch (e) {
    alert(e);
    return;
  }

  // get image size to declare canva size

  // convert the image to a texture
  var texture = canvas.texture(image);

  // const imgWidth = image.naturalWidth();
  // const imgHeight = image.naturalHeight();

  // apply the ink filter
  canvas
    .draw(texture)
    .brightnessContrast(0.05, 0.24)
    .colorHalftone(320, 239.5, 1.48, 3)
    .update();

  // replace the image with the canvas
  image.parentNode.insertBefore(canvas, image);
  image.parentNode.removeChild(image);

  // set the canvas size to get the cs to work
  // canvas.setAttribute('width', imgWidth)
  // canvas.setAttribute('height', imgHeight)

  // Note: instead of swapping the <canvas> tag with the <img> tag
  // as done above, we could have just transferred the contents of
  // the image directly:
  //
  //     image.src = canvas.toDataURL('image/png');
  //
  // This has two disadvantages. First, it is much slower, so it
  // would be a bad idea to do this repeatedly. If you are going
  // to be repeatedly updating a filter it's much better to use
  // the <canvas> tag directly. Second, this requires that the
  // image is hosted on the same domain as the script because
  // JavaScript has direct access to the image contents. When the
  // two tags were swapped using the previous method, JavaScript
  // actually doesn't have access to the image contents and this
  // does not violate the same origin policy.
}



    function toc() {
      const titles = document.querySelectorAll('main h2');
      const list = document.createElement("ul");
      titles.forEach(title => {
          const link = document.createElement("a");
          const item = document.createElement("li");
          link.innerHTML = title.innerHTML;
          link.setAttribute("href", `#${title.id}`);
          item.appendChild(link)
          list.append(item);
      })
      document.querySelector(`.active`).append(list);
      console.log(list);

  };


