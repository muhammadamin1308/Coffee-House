export function loadModal(): string {
  return `    <div class="modal-overlay" id="modal-overlay">
      <div class="modal" id="modal">
        <button class="modal-close" id="modal-close">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </button>
        <div class="modal-content">
          <div class="modal-image">
            <img id="modal-product-image" src="" alt="" />
          </div>
          <div class="modal-details">
            <h3 id="modal-product-name" class="modal-title"></h3>
            <p id="modal-product-description" class="modal-description"></p>

            <div class="modal-section">
              <h4 class="modal-section-title">Size</h4>
              <div class="modal-options size-options" id="size-options">
                <label class="modal-option">
                  <input
                    type="radio"
                    name="size"
                    value="s"
                    data-price="0.00"
                    checked
                  />
                  <span class="option-button">
                    <span class="option-icon">S</span>
                    <span class="option-text" id="size-s-text">200 ml</span>
                  </span>
                </label>
                <label class="modal-option">
                  <input type="radio" name="size" value="m" data-price="0.50" />
                  <span class="option-button">
                    <span class="option-icon">M</span>
                    <span class="option-text" id="size-m-text">300 ml</span>
                  </span>
                </label>
                <label class="modal-option">
                  <input type="radio" name="size" value="l" data-price="1.00" />
                  <span class="option-button">
                    <span class="option-icon">L</span>
                    <span class="option-text" id="size-l-text">400 ml</span>
                  </span>
                </label>
              </div>
            </div>

            <div class="modal-section">
              <h4 class="modal-section-title">Additives</h4>
              <div class="modal-options additive-options" id="additive-options">
                <label class="modal-option">
                  <input
                    type="checkbox"
                    name="additive"
                    value="additive-1"
                    data-price="0.50"
                  />
                  <span class="option-button">
                    <span class="option-icon">1</span>
                    <span class="option-text" id="additive-1-text">Sugar</span>
                  </span>
                </label>
                <label class="modal-option">
                  <input
                    type="checkbox"
                    name="additive"
                    value="additive-2"
                    data-price="0.50"
                  />
                  <span class="option-button">
                    <span class="option-icon">2</span>
                    <span class="option-text" id="additive-2-text"
                      >Cinnamon</span
                    >
                  </span>
                </label>
                <label class="modal-option">
                  <input
                    type="checkbox"
                    name="additive"
                    value="additive-3"
                    data-price="0.50"
                  />
                  <span class="option-button">
                    <span class="option-icon">3</span>
                    <span class="option-text" id="additive-3-text">Syrup</span>
                  </span>
                </label>
              </div>
            </div>

            <div class="modal-footer">
              <div class="modal-total">
                <span class="total-label">Total:</span>
                <span class="total-price" id="modal-total-price">$4.20</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`
}