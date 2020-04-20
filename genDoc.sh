pandoc --pdf-engine=xelatex --wrap=auto --listings -H docs/listings-setup.tex -o tmp.pdf --toc Readme.md Semana1.md Semana2.md Semana3.md Semana4.md Semana5.md Semana6.md Semana7.md Semana8.md 
gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=Libro.pdf ./docs/portada.pdf tmp.pdf
 

