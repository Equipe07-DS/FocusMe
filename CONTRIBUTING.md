# **FocusMe**

## **Equipe 7**

* Ádson Arantes Viana  
* Arthur Fernandes de Oliveira Lima  
* Gabriel Rio Tinto Cavalcanti  
* Juan Lucas Clemente de Macena  
* Luiz Miguel Veloso de Sousa  
* Maria Alice Chaves de Amorim  
* Vitória das Dores da Silva Nascimento

1. **Qual será o fluxo de colaboração no repositório (ex.: como abrir uma issue ou PR)?**

A partir da branch main e à medida que forem criadas as branches, os commits devem ser feitos frequentemente para que os códigos sejam armazenados, para que tenhamos um controle de versões para caso seja necessário consultar códigos prévios. Ao fim da construção do código de alguma feature deve-se abrir um Pull Request a fim de que seja feito o merge para o código principal, porém isso deve ser feito apenas após uma verificação e aprovação de outros componentes da equipe, principalmente aqueles responsáveis pela parte de desenvolvimento. Se tratando mais especificamente sobre o Pull Request, ele não deve ser feito para a branch main e sim para uma branch develop, a fim de garantir que a main mantenha sua estrutura original. Além disso, o PR deve conter um comentário que deve ser bem objetivo acerca do que foi criado naquela branch,  em qual diretório deve abrir, como testar as funcionalidades e quais são os comandos.

2. **Convenções de nomes de branches e mensagens de commit.**

Com relação às branches, é interessante e uma boa prática manter a branch main com a estrutura fixa e ideal para o funcionamento do código e que a partir dela sejam criadas branches para cada feature que será adicionada ao software. Essas novas branches começam com “feat/NomeDaFeature”, o nome da nova feature deve ter a primeira letra de cada palavra escrita em maiúsculo. Acerca das mensagens do commit, é interessante que antes elas tenham por escrito para qual branch esse commit pretende ir, a fim de facilitar o rastreio em casos de erro,  e em seguida um breve comentário sobre o que foi adicionado ou o que foi editado para que fique bem evidente quais são as alterações, evitando comentários rasos e genéricos.

3. **Regras para revisar código.**

Acerca das boas práticas na revisão do código, primeiramente é necessário analisar se foi cumprido o requisito o qual ele pretendia atingir. Se isso foi alcançado então deve-se prestar atenção se houve uma construção simples, na medida do possível, e compreensível, no caso em que todas essas metas tenham sido atingidas o Pull Request deve ser aceito, caso contrário, por algum motivo o código não está de acordo com essas regras, então deve-se contatar o responsável pelo request a fim de reajustar as partes incoerentes. A revisão de código terá como responsáveis prioritários os líderes da área de desenvolvimento, podendo ser ajudados por qualquer outro membro além do qual escreveu o código.

## **Como configurar o projeto localmente (ex.: dependências, comandos úteis)?**

1. **Pré-requisitos: ter instalado na máquina o [node.js](http://node.js) (pode ser baixado no site [https://nodejs.org/en](https://nodejs.org/en)), o git (pode ser baixado no site [https://git-scm.com/downloads](https://git-scm.com/downloads)) e o react (pode ser baixado e no site [https://react.dev/](https://react.dev/) ) e um editor de código.**  
2. **Clone o repositório com o comando: “git clone [https://github.com/Equipe07-DS/FocusMe.git](https://github.com/Equipe07-DS/FocusMe.git)”**  
3. **Pelo terminal entre na pasta do backend e instale as dependências do backend pelo comando  “pip install \-r requirements.txt”**   
4. **Em seguida, na pasta app, use o comando “uvicorn main:app  \--reload” (caso queira verificar se está tudo funcionando abra o navegador e coloque no endereço: “[http://localhost:8000/redoc](http://localhost:8000/redoc)”)**  
5. **Abra outro terminal e entre na pasta do frontend e use o comando “npm install” em seguida “npm start”.** 

