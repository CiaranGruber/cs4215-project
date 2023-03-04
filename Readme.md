# An Interpreter for C
### This project aims to implement an interpreter for C sublanguage. 
### The scope of the language is defined in the Backus-Naur Form below.
### This project was made by Ciaran Gruber and [Jody Tang](https://github.com/JodyLorah)
<br>

##   Backus-Naur Form  
---
### The following is the Backus-Naur Form our team adopted for the C sublanguage.
```
# The following Backus-Naur Form was editted from _______

<translation-unit> ::= {<external-definition>}+

<external-declaration> ::= <function-definition>
                         | <declaration>

<function-definition> ::= <declaration-specifiers> <declarator> {<declaration-list>}? <compound-statement>

<compound-statement> ::= { {<block-item-list>}? }

<block-item-list> ::= {<block-item>}+

<block-item> ::= <declaration>
               | <statement>

<expression-statement> ::= {<expression>}? ;

<selection-statement> ::= if ( <expression> ) <statement> {else <statement>}?


<iteration-statement> ::= while ( <expression> ) <statement>

<jump-statement> ::= return {<expression>}? ;

<initialiser> ::= <assignment-expression> 
                | { <initialiser-list> { , }? } 

<initialiser-list> ::= {<initialiser-list> , }? {<designation>}? <initialiser>

<designation> ::= <designator-list> =

<designator-list> ::= {<designator>}+ 

<designator> ::= [ <constant-expression> ] 

<init-declarator-list> ::= {<init-declarator> , }* <init-declarator>

<init-declarator> ::= <declarator> { = <initialiser>}?

<declaration> ::= <declaration-specifiers> {<init-declarator-list>}? ;

<declaration-specifiers> ::= <storage-class-specifier> {<declaration-specifiers>}?
                           | <type-specifier> {<declaration-specifiers>}?
                           | <type-qualfier> {<declaration-specifiers>}?
                           | <function-specifier> {<declaration-specifiers>}?

<declarator> ::= {<pointer>}? <direct-declarator>

<direct-declarator> ::= <identifier> 
                      | ( <declarator> ) 
                      | <direct-declarator> [ {<type-qualifier-list>}? {<assignment-expression>}? ] 
                      | <direct-declarator> [ <type-qualifier-list> * ] 
                      | <direct-declarator> ( <parameter-type-list> ) 
                      | <direct-declarator> ( {<identifier-list>}? ) 

<pointer> ::= { * {<type-qualifier-list>}?}+

<parameter-type-list> ::= <parameter-list> 

<parameter-list> ::= (<parameter-declaration> , )* <parameter-declaration>


<parameter-declaration> ::= <declaration-specifiers> <declarator>
                          | <declaration-specifiers> {<abstract-declarator>}? 


<abstract-declarator> ::= <pointer>
                        | {<pointer>}? <direct-abstract-declarator>

<direct-abstract-declarator> ::= ( <abstract-declarator> )
                               | <direct-abstract-declarator> [ {<type-qualifier-list>}? {<assignment-expression>}? ] 
                               | <direct-abstract-declarator> [ <type-qualifier-list> * ] 
                               | <direct-abstract-declarator> ( <parameter-type-list> ) 

<statement> ::= <labelled-statement>
              | <compound-statement>
              | <expression-statement>
              | <selection-statement>
              | <iteration-statement>
              | <jump-statement>

<type-specifier> ::= void
                   | char
                   | int
                   | double

<type-qualifier-list> ::= {<type-qualifier>}+

<type-qualifier> ::= const 

<type-name> ::= <specifier-qualifier-list> {<abstract-declarator>}?


<specifier-qualifier-list> ::= <type-specifier> {<specifier-qualifier-list>}?
                             | <type-qualifier> {<specifier-qualifier-list>}?

<constant-expression> ::= <conditional-expression>

<expression> ::= <assignment-expression>

<assignment-expression> ::= <conditional-expression>
                          | <unary-expression> = <assignment-expression>
                          | <unary-expression> <assignment-operator-shorthand> <assignment-expression>

<assignment-operator-shorthand> ::= *=
                                  | /=
                                  | %=
                                  | +=
                                  | -=

<conditional-expression> ::= <logical-or-expression>

<logical-or-expression> ::= {<logical-and-expression> && }* <logical-and-expression>

<logical-and-expression> ::= {<equality-expression> && }* <equality-expression>


<equality-expression> ::= {<equality-expression> <equality-operators>}? <relational-expression>

<equality-operators> ::= == 
                       | != 


<relational-expression> ::= {<relational-expression> <relational-operators>}? <additive-expression>

<relational-operators> ::= >
                         | <
                         | >=
                         | <=


<additive-expression> ::= {<additive-expression> <additive-operators>}? <multiplicative-expression>

<additive-operators> ::= +
                       | -


<multiplicative-expression> ::= {<multiplicative-expression> <multiplicative-operators>}? <cast-expression>

<multiplicative-operators> ::= *
                             | /
                             | %

<cast-expression> ::= { ( <type-name> ) }* <unary-expression>

<unary-expression> ::= <postfix-expression>
                     | ++ <unary-expression> 
                     | -- <unary-expression> 
                     | <unary-operator> <cast-expression> 
                     | sizeof ( <type-name> ) 
                                              

<unary-operator> ::= & 
                   | * 
                   | + 
                   | - 
                   | ! 

<postfix-expression> ::= <primary-expression>
                       | <postfix-expression> [ <expression> ]  
                       | <postfix-expression> ( ) 
                       | <postfix-expression> ( <argument-expression-list> ) 
                       | <postfix-expression> ++ 
                       | <postfix-expression> -- 

<primary-expression> ::= <identifier>
                       | <constant>
                       | <string>
                       | ( <expression> ) 

<identifier-list> ::= <identifier>
                    | <identifier-list> , <identifier>

<identifier> ::= <letter> {<alpha-num>}*

<constant> ::= <integer-constant>
             | <character-constant>
             | <floating-constant>

<string> ::= " {<alpha-num>}* "

<character-constant> ::= ' <alpha-num> '

<integer-constant> ::= <signed-integer>
                     | <unsigned-integer>

<floating-constant> ::= <integer> . <unsigned-integer>

<signed-integer> ::= <sign> <unsigned-integer>

<unsigned-integer> ::= {<digit>}+

<sign> ::= +
         | -

<alpha-num> ::= <digit> 
              | <letter>

<digit> ::= 0
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9

<letter> ::= A
           | B
           | C
           | D
           | E
           | F
           | G
           | H
           | I
           | J
           | K
           | L
           | M
           | N
           | O
           | P
           | Q
           | R
           | S
           | T
           | U
           | V
           | W
           | X
           | Y
           | Z
           | a
           | b
           | c
           | d
           | e
           | f
           | g
           | h
           | i
           | j
           | k
           | l
           | m
           | n
           | o
           | p
           | q
           | r
           | s
           | t
           | u
           | v
           | w
           | x
           | y
           | z
```