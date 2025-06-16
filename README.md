<img src="assets/logoFocusMe.png" height="400px">

## Projeto: FocusMe<br>Desenvolvimento de Software (2025.1)<br>Centro de Informática UFPE

##### Contexto:
O projeto é uma aplicação com integração de API para inteligencia artificial generativa, e a proposta central é solucionar o problema de organização da rotina de estudos para pessoas com rotinas apertadas.

##### Equipe:

* Ádson Viana \<aav>
* Arthur Fernandes \<afol>
* Gabriel Rio \<grtc>
* Juan Lucas \<jlcm>
* Luiz Veloso \<lmvs>
* Maria Amorim \<maca>
* Vitória das Dores \<vdsn>

##### Sobre a aplicação

(em progresso)


#####  fluxo de colaboração no repositório

A partir da branch main e à medida que forem criadas as branches, os commits devem ser feitos frequentemente para que os códigos sejam armazenados, para que tenhamos um controle de versões para caso seja necessário consultar códigos prévios. Ao fim da construção do código de alguma feature deve-se abrir um Pull Request a fim de que seja feito o merge para o código principal, porém isso deve ser feito apenas após uma verificação e aprovação de outros componentes da equipe, principalmente aqueles responsáveis pela parte de desenvolvimento. Se tratando mais especificamente sobre o Pull Request, ele não deve ser feito para a branch main e sim para uma branch develop, a fim de garantir que a main mantenha sua estrutura original. Além disso, o PR deve conter um comentário que deve ser bem objetivo acerca do que foi criado naquela branch, em qual diretório deve abrir, como testar as funcionalidades e quais são os comandos.

##### Convenções de nomes de branches e mensagens de commit.

Com relação às branches, é interessante e uma boa prática manter a branch main com a estrutura fixa e ideal para o funcionamento do código e que a partir dela sejam criadas branches para cada feature que será adicionada ao software. Essas novas branches começam com “feat/NomeDaFeature”, o nome da nova feature deve ter a primeira letra de cada palavra escrita em maiúsculo. Acerca das mensagens do commit, é interessante que antes elas tenham por escrito para qual branch esse commit pretende ir, a fim de facilitar o rastreio em casos de erro, e em seguida um breve comentário sobre o que foi adicionado ou o que foi editado para que fique bem evidente quais são as alterações, evitando comentários rasos e genéricos.

##### Regras para revisar código.

Acerca das boas práticas na revisão do código, primeiramente é necessário analisar se foi cumprido o requisito o qual ele pretendia atingir. Se isso foi alcançado então deve-se prestar atenção se houve uma construção simples, na medida do possível, e compreensível, no caso em que todas essas metas tenham sido atingidas o Pull Request deve ser aceito, caso contrário, por algum motivo o código não está de acordo com essas regras, então deve-se contatar o responsável pelo request a fim de reajustar as partes incoerentes. A revisão de código terá como responsáveis prioritários os líderes da área de desenvolvimento, podendo ser ajudados por qualquer outro membro além do qual escreveu o código.
Como configurar o projeto localmente (ex.: dependências, comandos úteis)?

    Pré-requisitos: ter instalado na máquina o node.js (pode ser baixado no site https://nodejs.org/en), o git (pode ser baixado no site https://git-scm.com/downloads) e o react (pode ser baixado e no site https://react.dev/ ) e um editor de código.
    Clone o repositório com o comando: “git clone https://github.com/Equipe07-DS/FocusMe.git”
    Pelo terminal entre na pasta do backend e instale as dependências do backend pelo comando “pip install -r requirements.txt”
    Em seguida, na pasta app, use o comando “uvicorn main:app --reload” (caso queira verificar se está tudo funcionando abra o navegador e coloque no endereço: “http://localhost:8000/redoc”)
    Abra outro terminal e entre na pasta do frontend e use o comando “npm install” em seguida “npm start”.

