/**
 * AboutModal organism - information and credits dialog
 */

import { Icon } from '../atoms/Icon.js';

export class AboutModal {
  constructor() {
    this.relatedProducts = [];
    this.element = this.render();
    this.isOpen = false;
    this.loadRelatedProducts();
  }

  render() {
    const modal = document.createElement('div');
    modal.className = 'modal about-modal';
    modal.style.display = 'none';

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.addEventListener('click', () => this.close());

    const content = document.createElement('div');
    content.className = 'modal-content about-content';

    const header = document.createElement('div');
    header.className = 'modal-header';

    const title = document.createElement('h2');
    title.textContent = 'About LogicPath';

    const closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    const closeIcon = new Icon('close');
    closeButton.appendChild(closeIcon.getElement());
    closeButton.addEventListener('click', () => this.close());

    header.appendChild(title);
    header.appendChild(closeButton);

    const body = document.createElement('div');
    body.className = 'modal-body';

    // Description section
    const descSection = this.createSection(
      'About',
      'LogicPath is an educational coding game inspired by Cubetto. Use visual programming blocks to guide a robot through grid-based puzzles and learn computational thinking!'
    );

    // Project links section
    const linksSection = document.createElement('div');
    linksSection.className = 'about-section';
    const linksTitle = document.createElement('h3');
    linksTitle.textContent = 'Project';
    const linksList = document.createElement('ul');
    linksList.innerHTML = `
      <li><a href="https://github.com/dwildt/logicpath" target="_blank" rel="noopener">View on GitHub</a></li>
      <li><a href="https://github.com/sponsors/dwildt" target="_blank" rel="noopener">Sponsor this project ❤️</a></li>
    `;
    linksSection.appendChild(linksTitle);
    linksSection.appendChild(linksList);

    // Credits section
    const creditsSection = document.createElement('div');
    creditsSection.className = 'about-section';
    const creditsTitle = document.createElement('h3');
    creditsTitle.textContent = 'Credits';
    const creditsList = document.createElement('ul');
    creditsList.innerHTML = `
      <li>Built with <a href="https://claude.com/claude-code" target="_blank" rel="noopener">Claude Code</a></li>
      <li>Inspired by <a href="https://primotoys.com" target="_blank" rel="noopener">Cubetto</a></li>
      <li>Created by <a href="https://github.com/dwildt" target="_blank" rel="noopener">dwildt</a></li>
    `;
    creditsSection.appendChild(creditsTitle);
    creditsSection.appendChild(creditsList);

    // License section
    const licenseSection = this.createSection(
      'License',
      'This project is licensed under the MIT License. See the LICENSE file for details.'
    );

    // Related products section
    this.productsSection = document.createElement('div');
    this.productsSection.className = 'about-section';
    const productsTitle = document.createElement('h3');
    productsTitle.textContent = 'Physical Coding Toys';
    this.productsContainer = document.createElement('ul');
    this.productsContainer.className = 'related-products';
    this.productsSection.appendChild(productsTitle);
    this.productsSection.appendChild(this.productsContainer);

    body.appendChild(descSection);
    body.appendChild(linksSection);
    body.appendChild(creditsSection);
    body.appendChild(licenseSection);
    body.appendChild(this.productsSection);

    content.appendChild(header);
    content.appendChild(body);

    modal.appendChild(overlay);
    modal.appendChild(content);

    return modal;
  }

  createSection(title, text) {
    const section = document.createElement('div');
    section.className = 'about-section';

    const heading = document.createElement('h3');
    heading.textContent = title;

    const paragraph = document.createElement('p');
    paragraph.textContent = text;

    section.appendChild(heading);
    section.appendChild(paragraph);

    return section;
  }

  async loadRelatedProducts() {
    try {
      const response = await fetch('./related-products.json');
      if (response.ok) {
        const data = await response.json();
        this.relatedProducts = data.products || [];
        this.renderProducts();
      }
    } catch (error) {
      console.error('Error loading related products:', error);
    }
  }

  renderProducts() {
    this.productsContainer.innerHTML = '';

    this.relatedProducts.forEach(product => {
      const li = document.createElement('li');
      li.innerHTML = `
        <strong><a href="${product.url}" target="_blank" rel="noopener">${product.name}</a></strong>
        - ${product.description}
        ${product.category ? `<span class="category">(${product.category})</span>` : ''}
      `;
      this.productsContainer.appendChild(li);
    });
  }

  open() {
    this.isOpen = true;
    this.element.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  close() {
    this.isOpen = false;
    this.element.style.display = 'none';
    document.body.style.overflow = '';
  }

  getElement() {
    return this.element;
  }

  destroy() {
    this.element.remove();
  }
}
