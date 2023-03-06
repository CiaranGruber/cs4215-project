grammar CLang;

Translation_unit 
    : External_definition+
    ;
External_declaration
    : Function_definition
    | Declaration
    ;

Function_definition 
    : Declaration_specifiers Declarator Declaration_list? Compound_statement
    ;

Compound_statement 
    : '{' Block_item_list? '}'
    ;

Block_item_list 
    : Block_item+
    ;

Block_item 
    : Declaration
    | Statement
    ;

Expression_statement 
    : Expression? ';'
    ;

Selection_statement 
    : 'if' '(' Expression ')' Statement ('else' Statement)?
    ;

Iteration_statement 
    : 'while' '(' Expression ')' Statement
    ;

Jump_statement 
    : 'return' Expression? ';'
    ;

Initialiser 
    : Assignment_expression
    | '{' Initialiser_list (',')? '}'
    ;

Initialiser_list 
    : (Initialiser_list ',')? Designation? Initialiser
    ;

Designation 
    : Designator_list '='
    ;

Designator_list 
    : Designator+
    ;

Designator 
    : '[' Constant_expression ']'
    | '.' Identifier
    ;

Init_declarator_list 
    : (Init_declarator ',')* Init_declarator
    ;

Init_declarator 
    : Declarator ('=' Initialiser)?
    ;

Declaration 
    : Declaration_specifiers Init_declarator_list? ';'
    ;

Declaration_specifiers 
    : (Storage_class_specifier | Type_specifier | Type_qualfier | Function_specifier) Declaration_specifiers?
    ;

Declarator 
    : Pointer? Direct_declarator
    ;

Direct_declarator 
    : Identifier
    | '(' Declarator ')'
    | Direct_declarator '[' Type_qualifier_list? Assignment_expression? ']'
    /* | Direct_declarator '[' Type_qualifier_list '*' ']' */
    | Direct_declarator '(' (Parameter_type_list | Identifier_list?) ')'
    ;

Pointer 
    : ('*' Type_qualifier_list?)+ 
    ;

Parameter_type_list 
    : Parameter_list
    ;

Parameter_list 
    : (Parameter_declaration ',')* Parameter_declaration
    ;

Parameter_declaration 
    : Declaration_specifiers (Declarator | Abstract_declarator?)
    ;

Abstract_declarator 
    : Pointer
    | Pointer? Direct_abstract_declarator
    ;

Direct_abstract_declarator 
    : '(' Abstract_declarator ')'
    | Direct_abstract_declarator '[' Type_qualifier_list? Assignment_expression? ']'
    /* | Direct_abstract_declarator '[' Type_qualifier_list '*' ']' */
    | Direct_abstract_declarator '(' Parameter_type_list ')'
    ;

Statement 
    : Labelled_statement
    | Compound_statement
    | Expression_statement
    | Selection_statement
    | Iteration_statement
    | Jump_statement
    ;

Type_specifier 
    : 'void'
    | 'char'
    | 'int'
    | 'double'
    ;

Type_qualifier_list 
    : Type_qualifier+
    ;

Type_qualifier 
    : 'const'
    ;

Type_name 
    : Specifier_qualifier_list Abstract_declarator?
    ;

Specifier_qualifier_list 
    : (Type_specifier | Type_qualifier)+
    ;

Constant_expression 
    : Conditional_expression
    ;

Expression 
    : Assignment_expression
    ;

Assignment_expression 
    : Conditional_expression
    | Unary_expression ('=' | Assignment_operator_shorthand) Assignment_expression
    ;

Assignment_operator_shorthand 
    : ('*=' | '/=' | '%=' | '+=' | '_=')
    ;

Conditional_expression 
    : Logical_or_expression
    ;

Logical_or_expression 
    : (logical_and_expression '&&')* Logical_and_expression
    ;

Logical_and_expression 
    : (Equality_expression '&&')* Equality_expression
    ;

Equality_expression 
    : (Equality_expression Equality_operators)? Relational_expression
    ;

Equality_operators 
    : '=='
    | '!='
    ;

Relational_expression
    :   Additive_expression (('<'|'>'|'<='|'>=') Additive_expression)*
    ;

Additive_expression
    :   Multiplicative_expression (('+'|'_') Multiplicative_expression)*
    ;

Multiplicative_expression
    :   Cast_expression (('*'|'/'|'%') Cast_expression)*
    ;


Cast_expression 
    : ('(' type_name ')')* Unary_expression
    ;

Unary_expression 
    : Postfix_expression
    | ('++' | '__') Unary_expression
    | Unary_operator Cast_expression
    | 'sizeof' '(' Type_name ')'
    ;

Unary_operator 
    : '&'
    | '*'
    | '+'
    | '_'
    | '!'
    ;

Postfix_expression 
    : Primary_expression
    | Postfix_expression '[' Expression ']' 
    | Postfix_expression '(' Argument_expression_list? ')'
    | Postfix_expression '++'
    | Postfix_expression '__'
    ;

Primary_expression 
    : Identifier
    | Constant
    | String
    | '(' Expression ')'
    ;

Identifier_list 
    : (Identifier_list ',')* Identifier
    ;

Identifier 
    : Letter Alpha_num*
    ;

Constant 
    : Integer_constant
    | Character_constant
    | Floating_constant
    ;

String 
    : '"' Alpha_num* '"'
    ;

Character_constant 
    : ''' Alpha_num '''
    ;

Integer_constant 
    : Signed_integer
    | Unsigned_integer
    ;

Floating_constant 
    : Integer_constant '.' Unsigned_integer
    ;

Signed_integer 
    : Sign Unsigned_integer
    ;

Unsigned_integer 
    : Digit+
    ;

Sign 
    : ('+' | '_')
    ;

Alpha_num 
    : Digit 
    | Letter
    ;

Digit 
    : '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    ;

Letter 
    : 'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z'
    | 'a'
    | 'b'
    | 'c'
    | 'd'
    | 'e'
    | 'f'
    | 'g'
    | 'h'
    | 'i'
    | 'j'
    | 'k'
    | 'l'
    | 'm'
    | 'n'
    | 'o'
    | 'p'
    | 'q'
    | 'r'
    | 's'
    | 't'
    | 'u'
    | 'v'
    | 'w'
    | 'x'
    | 'y'
    | 'z'
    ;