function permissoes(...perfisPermitidos) {
  return (req, res, next) => {
    const user = req.session && req.session.user;
    if (!user) {
      // não autenticado — redireciona ao login público
      return res.redirect('/inicial.html');
    }
    if (perfisPermitidos.length === 0 || perfisPermitidos.includes(user.tipo_conta)) {
      return next();
    }
    // autenticado porém sem permissão
    return res.status(403).send('Acesso negado');
  };
}

module.exports = permissoes;