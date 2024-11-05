/******/ (() => { // webpackBootstrap
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
document.getElementById("scrapeButton").addEventListener("click", async () => {
  const feedback = document.getElementById("feedback");
  const output = document.getElementById("output");

  feedback.textContent = "Realizando scraping...";
  output.innerHTML = "";

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      func: scrapeProducts,
    },
    (results) => {
      const data = results[0].result; // Recoge los resultados
      if (data.length === 0) {
        feedback.textContent = "No se encontraron productos.";
        document.getElementById("downloadButton").style.display = "none";
      } else {
        feedback.textContent = "Scraping completado.";
        output.innerHTML = data
          .map(
            (product, i) =>
              `<div class="divcardgeneral">
                  <p class="pre">Producto scrapeado n°:${i + 1}</p>
                  <h2 class="letrab">${product.name}</h2>
                  <p class="for">${product.sellerName}</p>
                  <div class="divcardsecundary">
                   <p class="price">${product.salePrice}</p>
                   <div class="descuento">
                   <p class="pricedes">${product.salePriceDes}</p>
                   <p class="pricetag">${product.priceTag}</p>
                   </div>
                  </div>
                 </div>`
          )
          .join("");
        document.getElementById("downloadButton").style.display = "inline";
        document.getElementById("downloadButton").onclick = () =>
          downloadJSON(data);
      }
    }
  );
});

// Función para realizar el scraping
async function scrapeProducts() {
  function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  await delay(200); // Espera 200 ms para asegurarse de que la página esté cargada

  let cards = document.querySelectorAll(
    "div.showcase-grid>div> .Showcase__content"
  ); // Selecciona todos los elementos con la clase 'card'
  cards = [...cards]; // Convierte NodeList a Array

  // Mapea los elementos de las tarjetas a un array de productos
  const products = cards.map((el) => {
    const name =
      el.querySelector(".Showcase__name")?.textContent.trim() ||
      "Nombre no encontrado";
    const sellerName =
      el.querySelector(".Showcase__SellerName")?.textContent.trim() ||
      "Vendedor no encontrado";
    const salePrice =
      el.querySelector(".Showcase__salePrice")?.textContent.trim() ||
      "Precio no encontrado";
    const salePriceDes =
      el.querySelector(".Showcase__ohPrice")?.textContent.trim() || "";
    const priceTag =
      el
        .querySelector(
          "#undefined-27 > div > div > div > div.showcase-description > div.Showcase__details > div.Showcase__details__text > div.Showcase__priceBox > div > div > div.Showcase__priceTag.Showcase__priceTag--ohPrice > span"
        )
        ?.textContent.trim() || "-0%";
    return { name, sellerName, salePrice, priceTag, salePriceDes }; // Retorna un objeto por cada producto
  });

  return products; // Devuelve todos los productos encontrados
}

// Función para descargar el JSON con el nombre ingresado por el usuario
function downloadJSON(data) {
  const filenameInput = document.getElementById("filenameInput");
  const filename = filenameInput.value.trim() || "testdarli"; // Nombre predeterminado si no se ingresa uno
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLG1DQUFtQztBQUM3RTtBQUNBO0FBQ0EsZ0JBQWdCLGVBQWU7QUFDL0I7QUFDQSxLQUFLO0FBQ0w7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5REFBeUQsTUFBTTtBQUMvRCx1Q0FBdUMsYUFBYTtBQUNwRCxtQ0FBbUMsbUJBQW1CO0FBQ3REO0FBQ0Esc0NBQXNDLGtCQUFrQjtBQUN4RDtBQUNBLHlDQUF5QyxxQkFBcUI7QUFDOUQseUNBQXlDLGlCQUFpQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsdURBQXVEO0FBQ3BFLEdBQUc7QUFDSDtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlEO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vU2NyYXBlciBWZWEgMi8uL3NyYy9wb3B1cC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjcmFwZUJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYXN5bmMgKCkgPT4ge1xyXG4gIGNvbnN0IGZlZWRiYWNrID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmZWVkYmFja1wiKTtcclxuICBjb25zdCBvdXRwdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm91dHB1dFwiKTtcclxuXHJcbiAgZmVlZGJhY2sudGV4dENvbnRlbnQgPSBcIlJlYWxpemFuZG8gc2NyYXBpbmcuLi5cIjtcclxuICBvdXRwdXQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgY29uc3QgW3RhYl0gPSBhd2FpdCBjaHJvbWUudGFicy5xdWVyeSh7IGFjdGl2ZTogdHJ1ZSwgY3VycmVudFdpbmRvdzogdHJ1ZSB9KTtcclxuICBjaHJvbWUuc2NyaXB0aW5nLmV4ZWN1dGVTY3JpcHQoXHJcbiAgICB7XHJcbiAgICAgIHRhcmdldDogeyB0YWJJZDogdGFiLmlkIH0sXHJcbiAgICAgIGZ1bmM6IHNjcmFwZVByb2R1Y3RzLFxyXG4gICAgfSxcclxuICAgIChyZXN1bHRzKSA9PiB7XHJcbiAgICAgIGNvbnN0IGRhdGEgPSByZXN1bHRzWzBdLnJlc3VsdDsgLy8gUmVjb2dlIGxvcyByZXN1bHRhZG9zXHJcbiAgICAgIGlmIChkYXRhLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIGZlZWRiYWNrLnRleHRDb250ZW50ID0gXCJObyBzZSBlbmNvbnRyYXJvbiBwcm9kdWN0b3MuXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZEJ1dHRvblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmVlZGJhY2sudGV4dENvbnRlbnQgPSBcIlNjcmFwaW5nIGNvbXBsZXRhZG8uXCI7XHJcbiAgICAgICAgb3V0cHV0LmlubmVySFRNTCA9IGRhdGFcclxuICAgICAgICAgIC5tYXAoXHJcbiAgICAgICAgICAgIChwcm9kdWN0LCBpKSA9PlxyXG4gICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwiZGl2Y2FyZGdlbmVyYWxcIj5cclxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcmVcIj5Qcm9kdWN0byBzY3JhcGVhZG8gbsKwOiR7aSArIDF9PC9wPlxyXG4gICAgICAgICAgICAgICAgICA8aDIgY2xhc3M9XCJsZXRyYWJcIj4ke3Byb2R1Y3QubmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZvclwiPiR7cHJvZHVjdC5zZWxsZXJOYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRpdmNhcmRzZWN1bmRhcnlcIj5cclxuICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJpY2VcIj4ke3Byb2R1Y3Quc2FsZVByaWNlfTwvcD5cclxuICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZXNjdWVudG9cIj5cclxuICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJpY2VkZXNcIj4ke3Byb2R1Y3Quc2FsZVByaWNlRGVzfTwvcD5cclxuICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJpY2V0YWdcIj4ke3Byb2R1Y3QucHJpY2VUYWd9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgIDwvZGl2PmBcclxuICAgICAgICAgIClcclxuICAgICAgICAgIC5qb2luKFwiXCIpO1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZG93bmxvYWRCdXR0b25cIikuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZEJ1dHRvblwiKS5vbmNsaWNrID0gKCkgPT5cclxuICAgICAgICAgIGRvd25sb2FkSlNPTihkYXRhKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICk7XHJcbn0pO1xyXG5cclxuLy8gRnVuY2nDs24gcGFyYSByZWFsaXphciBlbCBzY3JhcGluZ1xyXG5hc3luYyBmdW5jdGlvbiBzY3JhcGVQcm9kdWN0cygpIHtcclxuICBmdW5jdGlvbiBkZWxheSh0aW1lKSB7XHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSkpO1xyXG4gIH1cclxuXHJcbiAgYXdhaXQgZGVsYXkoMjAwKTsgLy8gRXNwZXJhIDIwMCBtcyBwYXJhIGFzZWd1cmFyc2UgZGUgcXVlIGxhIHDDoWdpbmEgZXN0w6kgY2FyZ2FkYVxyXG5cclxuICBsZXQgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxyXG4gICAgXCJkaXYuc2hvd2Nhc2UtZ3JpZD5kaXY+IC5TaG93Y2FzZV9fY29udGVudFwiXHJcbiAgKTsgLy8gU2VsZWNjaW9uYSB0b2RvcyBsb3MgZWxlbWVudG9zIGNvbiBsYSBjbGFzZSAnY2FyZCdcclxuICBjYXJkcyA9IFsuLi5jYXJkc107IC8vIENvbnZpZXJ0ZSBOb2RlTGlzdCBhIEFycmF5XHJcblxyXG4gIC8vIE1hcGVhIGxvcyBlbGVtZW50b3MgZGUgbGFzIHRhcmpldGFzIGEgdW4gYXJyYXkgZGUgcHJvZHVjdG9zXHJcbiAgY29uc3QgcHJvZHVjdHMgPSBjYXJkcy5tYXAoKGVsKSA9PiB7XHJcbiAgICBjb25zdCBuYW1lID1cclxuICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5TaG93Y2FzZV9fbmFtZVwiKT8udGV4dENvbnRlbnQudHJpbSgpIHx8XHJcbiAgICAgIFwiTm9tYnJlIG5vIGVuY29udHJhZG9cIjtcclxuICAgIGNvbnN0IHNlbGxlck5hbWUgPVxyXG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKFwiLlNob3djYXNlX19TZWxsZXJOYW1lXCIpPy50ZXh0Q29udGVudC50cmltKCkgfHxcclxuICAgICAgXCJWZW5kZWRvciBubyBlbmNvbnRyYWRvXCI7XHJcbiAgICBjb25zdCBzYWxlUHJpY2UgPVxyXG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKFwiLlNob3djYXNlX19zYWxlUHJpY2VcIik/LnRleHRDb250ZW50LnRyaW0oKSB8fFxyXG4gICAgICBcIlByZWNpbyBubyBlbmNvbnRyYWRvXCI7XHJcbiAgICBjb25zdCBzYWxlUHJpY2VEZXMgPVxyXG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKFwiLlNob3djYXNlX19vaFByaWNlXCIpPy50ZXh0Q29udGVudC50cmltKCkgfHwgXCJcIjtcclxuICAgIGNvbnN0IHByaWNlVGFnID1cclxuICAgICAgZWxcclxuICAgICAgICAucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAgIFwiI3VuZGVmaW5lZC0yNyA+IGRpdiA+IGRpdiA+IGRpdiA+IGRpdi5zaG93Y2FzZS1kZXNjcmlwdGlvbiA+IGRpdi5TaG93Y2FzZV9fZGV0YWlscyA+IGRpdi5TaG93Y2FzZV9fZGV0YWlsc19fdGV4dCA+IGRpdi5TaG93Y2FzZV9fcHJpY2VCb3ggPiBkaXYgPiBkaXYgPiBkaXYuU2hvd2Nhc2VfX3ByaWNlVGFnLlNob3djYXNlX19wcmljZVRhZy0tb2hQcmljZSA+IHNwYW5cIlxyXG4gICAgICAgIClcclxuICAgICAgICA/LnRleHRDb250ZW50LnRyaW0oKSB8fCBcIi0wJVwiO1xyXG4gICAgcmV0dXJuIHsgbmFtZSwgc2VsbGVyTmFtZSwgc2FsZVByaWNlLCBwcmljZVRhZywgc2FsZVByaWNlRGVzIH07IC8vIFJldG9ybmEgdW4gb2JqZXRvIHBvciBjYWRhIHByb2R1Y3RvXHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBwcm9kdWN0czsgLy8gRGV2dWVsdmUgdG9kb3MgbG9zIHByb2R1Y3RvcyBlbmNvbnRyYWRvc1xyXG59XHJcblxyXG4vLyBGdW5jacOzbiBwYXJhIGRlc2NhcmdhciBlbCBKU09OIGNvbiBlbCBub21icmUgaW5ncmVzYWRvIHBvciBlbCB1c3VhcmlvXHJcbmZ1bmN0aW9uIGRvd25sb2FkSlNPTihkYXRhKSB7XHJcbiAgY29uc3QgZmlsZW5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmlsZW5hbWVJbnB1dFwiKTtcclxuICBjb25zdCBmaWxlbmFtZSA9IGZpbGVuYW1lSW5wdXQudmFsdWUudHJpbSgpIHx8IFwidGVzdGRhcmxpXCI7IC8vIE5vbWJyZSBwcmVkZXRlcm1pbmFkbyBzaSBubyBzZSBpbmdyZXNhIHVub1xyXG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMildLCB7XHJcbiAgICB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICB9KTtcclxuICBjb25zdCB1cmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG4gIGNvbnN0IGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYVwiKTtcclxuICBhLmhyZWYgPSB1cmw7XHJcbiAgYS5kb3dubG9hZCA9IGAke2ZpbGVuYW1lfS5qc29uYDtcclxuICBhLmNsaWNrKCk7XHJcbiAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpO1xyXG59XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==