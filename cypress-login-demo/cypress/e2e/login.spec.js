describe('Login Formu Testi', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Başarılı form doldurma', () => {
    cy.get('input[type="email"]').type('emre@wit.com.tr');
    cy.get('input[type="password"]').type('12345678A');
    cy.get('input[type="checkbox"]').check();
    cy.get('button').click();
    cy.contains('Form başarıyla gönderildi!').should('be.visible');
  });

  it('Hatalı email girdiğimde doğru hata mesajı ve disabled buton', () => {
    cy.get('input[type="email"]').type('yanlis');
    cy.get('input[type="password"]').type('12345678A');
    cy.get('input[type="checkbox"]').check();

    cy.contains('Geçerli email giriniz').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('Hem email hem password hatalıyken iki hata mesajı görünmeli', () => {
    cy.get('input[type="email"]').type('yanlis');
    cy.get('input[type="password"]').type('kisa');
    cy.get('input[type="checkbox"]').check();

    cy.contains('Geçerli email giriniz').should('be.visible');
    cy.contains('Şifre en az 8 karakter ve sayı içermeli').should('be.visible');
    cy.get('button').should('be.disabled');
  });

  it('Email ve şifre doğru ama kurallar kabul edilmemişse buton disabled kalmalı', () => {
    cy.get('input[type="email"]').type('emre@wit.com.tr');
    cy.get('input[type="password"]').type('12345678A');
    cy.get('input[type="checkbox"]').uncheck();

    cy.get('button').should('be.disabled');
  });
});