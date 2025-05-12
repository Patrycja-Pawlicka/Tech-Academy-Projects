function openPopup(imgElement) {
    const popup = document.createElement("div");
    popup.className = "popup";
    
    const popupImg = document.createElement("img");
    popupImg.src = imgElement.src;
    popupImg.alt = imgElement.alt;
  
    popup.appendChild(popupImg);
    document.body.appendChild(popup);
  
    popup.onclick = function () {
      popup.remove();
    };
  }