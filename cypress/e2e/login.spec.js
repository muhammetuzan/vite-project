describe('Login Formu E2E Testi', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/');
    });
  
    it('Başarılı form doldurup submit edebiliyorum', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('Password1!');
      cy.get('input[type="checkbox"]').check();
      cy.get('button[type="submit"]').should('not.be.disabled').click();
      cy.url().should('include', '/success');
      cy.contains('Giriş Başarılı!').should('be.visible');
    });
  
    it('Hatalı email girince hata mesajı görünür ve buton disabled olur', () => {
      cy.get('input[type="email"]').type('yanlisemail');
      cy.get('input[type="password"]').type('Password1!');
      cy.get('input[type="checkbox"]').check();
      cy.get('p').contains('Geçerli bir email girin.').should('be.visible');
      cy.get('button[type="submit"]').should('be.disabled');
    });
  
    it('Email ve şifre yanlış girildiğinde hata mesajları görünür ve buton disabled olur', () => {
      cy.get('input[type="email"]').type('yanlisemail');
      cy.get('input[type="password"]').type('kisa');
      cy.get('input[type="checkbox"]').check();
      cy.get('p').contains('Geçerli bir email girin.').should('be.visible');
      cy.get('p').contains(
        'Şifre en az 8 karakter, büyük harf, küçük harf, sayı ve özel karakter içermelidir.'
      ).should('be.visible');
      cy.get('button[type="submit"]').should('be.disabled');
    });
  
    it('Email ve şifre doğru ama şartlar kabul edilmezse buton disabled olur', () => {
      cy.get('input[type="email"]').type('test@example.com');
      cy.get('input[type="password"]').type('Password1!');
      // checkbox işaretlenmiyor
      cy.get('button[type="submit"]').should('be.disabled');
    });
  });
  