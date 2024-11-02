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

  // Ejecuta el script en la página activa con un delay
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wdXAuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLG1DQUFtQztBQUM3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixlQUFlO0FBQy9CO0FBQ0EsS0FBSztBQUNMO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlELE1BQU07QUFDL0QsdUNBQXVDLGFBQWE7QUFDcEQsbUNBQW1DLG1CQUFtQjtBQUN0RDtBQUNBLHNDQUFzQyxrQkFBa0I7QUFDeEQ7QUFDQSx5Q0FBeUMscUJBQXFCO0FBQzlELHlDQUF5QyxpQkFBaUI7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHVEQUF1RDtBQUNwRSxHQUFHO0FBQ0g7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhEQUE4RDtBQUM5RDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTO0FBQzNCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL1NjcmFwZXIgVmVhIDIvLi9zcmMvcG9wdXAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzY3JhcGVCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcclxuICBjb25zdCBmZWVkYmFjayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmVlZGJhY2tcIik7XHJcbiAgY29uc3Qgb3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdXRwdXRcIik7XHJcblxyXG4gIGZlZWRiYWNrLnRleHRDb250ZW50ID0gXCJSZWFsaXphbmRvIHNjcmFwaW5nLi4uXCI7XHJcbiAgb3V0cHV0LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gIGNvbnN0IFt0YWJdID0gYXdhaXQgY2hyb21lLnRhYnMucXVlcnkoeyBhY3RpdmU6IHRydWUsIGN1cnJlbnRXaW5kb3c6IHRydWUgfSk7XHJcblxyXG4gIC8vIEVqZWN1dGEgZWwgc2NyaXB0IGVuIGxhIHDDoWdpbmEgYWN0aXZhIGNvbiB1biBkZWxheVxyXG4gIGNocm9tZS5zY3JpcHRpbmcuZXhlY3V0ZVNjcmlwdChcclxuICAgIHtcclxuICAgICAgdGFyZ2V0OiB7IHRhYklkOiB0YWIuaWQgfSxcclxuICAgICAgZnVuYzogc2NyYXBlUHJvZHVjdHMsXHJcbiAgICB9LFxyXG4gICAgKHJlc3VsdHMpID0+IHtcclxuICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdHNbMF0ucmVzdWx0OyAvLyBSZWNvZ2UgbG9zIHJlc3VsdGFkb3NcclxuICAgICAgaWYgKGRhdGEubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgZmVlZGJhY2sudGV4dENvbnRlbnQgPSBcIk5vIHNlIGVuY29udHJhcm9uIHByb2R1Y3Rvcy5cIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvd25sb2FkQnV0dG9uXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmZWVkYmFjay50ZXh0Q29udGVudCA9IFwiU2NyYXBpbmcgY29tcGxldGFkby5cIjtcclxuICAgICAgICBvdXRwdXQuaW5uZXJIVE1MID0gZGF0YVxyXG4gICAgICAgICAgLm1hcChcclxuICAgICAgICAgICAgKHByb2R1Y3QsIGkpID0+XHJcbiAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJkaXZjYXJkZ2VuZXJhbFwiPlxyXG4gICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByZVwiPlByb2R1Y3RvIHNjcmFwZWFkbyBuwrA6JHtpICsgMX08L3A+XHJcbiAgICAgICAgICAgICAgICAgIDxoMiBjbGFzcz1cImxldHJhYlwiPiR7cHJvZHVjdC5uYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZm9yXCI+JHtwcm9kdWN0LnNlbGxlck5hbWV9PC9wPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGl2Y2FyZHNlY3VuZGFyeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcmljZVwiPiR7cHJvZHVjdC5zYWxlUHJpY2V9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImRlc2N1ZW50b1wiPlxyXG4gICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcmljZWRlc1wiPiR7cHJvZHVjdC5zYWxlUHJpY2VEZXN9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcmljZXRhZ1wiPiR7cHJvZHVjdC5wcmljZVRhZ308L3A+XHJcbiAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+YFxyXG4gICAgICAgICAgKVxyXG4gICAgICAgICAgLmpvaW4oXCJcIik7XHJcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3dubG9hZEJ1dHRvblwiKS5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcclxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImRvd25sb2FkQnV0dG9uXCIpLm9uY2xpY2sgPSAoKSA9PlxyXG4gICAgICAgICAgZG93bmxvYWRKU09OKGRhdGEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgKTtcclxufSk7XHJcblxyXG4vLyBGdW5jacOzbiBwYXJhIHJlYWxpemFyIGVsIHNjcmFwaW5nXHJcbmFzeW5jIGZ1bmN0aW9uIHNjcmFwZVByb2R1Y3RzKCkge1xyXG4gIGZ1bmN0aW9uIGRlbGF5KHRpbWUpIHtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKSk7XHJcbiAgfVxyXG5cclxuICBhd2FpdCBkZWxheSgyMDApOyAvLyBFc3BlcmEgMjAwIG1zIHBhcmEgYXNlZ3VyYXJzZSBkZSBxdWUgbGEgcMOhZ2luYSBlc3TDqSBjYXJnYWRhXHJcblxyXG4gIGxldCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXHJcbiAgICBcImRpdi5zaG93Y2FzZS1ncmlkPmRpdj4gLlNob3djYXNlX19jb250ZW50XCJcclxuICApOyAvLyBTZWxlY2Npb25hIHRvZG9zIGxvcyBlbGVtZW50b3MgY29uIGxhIGNsYXNlICdjYXJkJ1xyXG4gIGNhcmRzID0gWy4uLmNhcmRzXTsgLy8gQ29udmllcnRlIE5vZGVMaXN0IGEgQXJyYXlcclxuXHJcbiAgLy8gTWFwZWEgbG9zIGVsZW1lbnRvcyBkZSBsYXMgdGFyamV0YXMgYSB1biBhcnJheSBkZSBwcm9kdWN0b3NcclxuICBjb25zdCBwcm9kdWN0cyA9IGNhcmRzLm1hcCgoZWwpID0+IHtcclxuICAgIGNvbnN0IG5hbWUgPVxyXG4gICAgICBlbC5xdWVyeVNlbGVjdG9yKFwiLlNob3djYXNlX19uYW1lXCIpPy50ZXh0Q29udGVudC50cmltKCkgfHxcclxuICAgICAgXCJOb21icmUgbm8gZW5jb250cmFkb1wiO1xyXG4gICAgY29uc3Qgc2VsbGVyTmFtZSA9XHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuU2hvd2Nhc2VfX1NlbGxlck5hbWVcIik/LnRleHRDb250ZW50LnRyaW0oKSB8fFxyXG4gICAgICBcIlZlbmRlZG9yIG5vIGVuY29udHJhZG9cIjtcclxuICAgIGNvbnN0IHNhbGVQcmljZSA9XHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuU2hvd2Nhc2VfX3NhbGVQcmljZVwiKT8udGV4dENvbnRlbnQudHJpbSgpIHx8XHJcbiAgICAgIFwiUHJlY2lvIG5vIGVuY29udHJhZG9cIjtcclxuICAgIGNvbnN0IHNhbGVQcmljZURlcyA9XHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuU2hvd2Nhc2VfX29oUHJpY2VcIik/LnRleHRDb250ZW50LnRyaW0oKSB8fCBcIlwiO1xyXG4gICAgY29uc3QgcHJpY2VUYWcgPVxyXG4gICAgICBlbFxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgXCIjdW5kZWZpbmVkLTI3ID4gZGl2ID4gZGl2ID4gZGl2ID4gZGl2LnNob3djYXNlLWRlc2NyaXB0aW9uID4gZGl2LlNob3djYXNlX19kZXRhaWxzID4gZGl2LlNob3djYXNlX19kZXRhaWxzX190ZXh0ID4gZGl2LlNob3djYXNlX19wcmljZUJveCA+IGRpdiA+IGRpdiA+IGRpdi5TaG93Y2FzZV9fcHJpY2VUYWcuU2hvd2Nhc2VfX3ByaWNlVGFnLS1vaFByaWNlID4gc3BhblwiXHJcbiAgICAgICAgKVxyXG4gICAgICAgID8udGV4dENvbnRlbnQudHJpbSgpIHx8IFwiLTAlXCI7XHJcbiAgICByZXR1cm4geyBuYW1lLCBzZWxsZXJOYW1lLCBzYWxlUHJpY2UsIHByaWNlVGFnLCBzYWxlUHJpY2VEZXMgfTsgLy8gUmV0b3JuYSB1biBvYmpldG8gcG9yIGNhZGEgcHJvZHVjdG9cclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHByb2R1Y3RzOyAvLyBEZXZ1ZWx2ZSB0b2RvcyBsb3MgcHJvZHVjdG9zIGVuY29udHJhZG9zXHJcbn1cclxuXHJcbi8vIEZ1bmNpw7NuIHBhcmEgZGVzY2FyZ2FyIGVsIEpTT04gY29uIGVsIG5vbWJyZSBpbmdyZXNhZG8gcG9yIGVsIHVzdWFyaW9cclxuZnVuY3Rpb24gZG93bmxvYWRKU09OKGRhdGEpIHtcclxuICBjb25zdCBmaWxlbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaWxlbmFtZUlucHV0XCIpO1xyXG4gIGNvbnN0IGZpbGVuYW1lID0gZmlsZW5hbWVJbnB1dC52YWx1ZS50cmltKCkgfHwgXCJ0ZXN0ZGFybGlcIjsgLy8gTm9tYnJlIHByZWRldGVybWluYWRvIHNpIG5vIHNlIGluZ3Jlc2EgdW5vXHJcbiAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtKU09OLnN0cmluZ2lmeShkYXRhLCBudWxsLCAyKV0sIHtcclxuICAgIHR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gIH0pO1xyXG4gIGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcbiAgY29uc3QgYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xyXG4gIGEuaHJlZiA9IHVybDtcclxuICBhLmRvd25sb2FkID0gYCR7ZmlsZW5hbWV9Lmpzb25gO1xyXG4gIGEuY2xpY2soKTtcclxuICBVUkwucmV2b2tlT2JqZWN0VVJMKHVybCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9