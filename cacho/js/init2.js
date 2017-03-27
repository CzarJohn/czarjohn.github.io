//UI RELATED
//todo add commas on thousands prices
//todo disable select
//todo don't place active on select's label

//FUNCTIONALITIES
//todo login user type
//todo choose printing format
//todo add item checklist - materials, labor, subcon
//todo add item inventory
//todo add legit item and supplier list
//todo add copy to clipboard

//FOR CLARIFICATION
//How will the project, supplier, PO list be sorted? //dont ask about this rn, hahaha, cuz sorting iz not good
//Should we allow function for archiving projects?
//Project length and average number of POs and suppliers per project

var supplierlist = [["AMPHASE ELECTRICAL SERVICES","318-027-461-000","19 Pearl St., Pasig Greenland Village, Rosario, Pasig City","","Telefax No. 719-0438","Mr. Ricardo R. Ang Jr."],
["885 STONE TOOLS TRADING","234-165-385-000","1079 D & E Edsa Balintawak Quezon City","","Tel No. 414-5885 * Fax No. 414-6885","Ms. Sherly"],
["A. QUILLOY CONSTRUCTION","NON-VAT REG:  257-440-797-000","B 8 L21 JAGUAR ST.,MERCADO VILLAGE,PULONG STA. CRUZ,SAT. ROSA CITY,LAGUNA","Cell# 0917-8262136","","Engr. Sally N. Lazaro"],
["AA ALUMINUM SUPPLY INC.","000-391-826-000","125 B. Serrano St. cor. 5th Ave. near EDSA Murphy Q.C","","Tel. No.  911-5011","Ms. Rosa"],
["     ALVIN GLASS AND ALUMINUM INC.","000-369-454-000","   995 North Edsa,Veterans Village 1, Quezon City 1105","","   Tel. No. 372-3611-15 * Fax No. 372-3616","Mr. Ponce Lee"],
["ALLGEMEINE BAU-CHEMIE PHILS., INC.","000-105-354-000","10/F Aslan Star Building, 2404 Asean Drive, Filinvest Corp. City","","Tel. No. 842-6891  * Fax No. 842-7146","Bouvier A.  Corbilla"],
["ACT'S PATEROS ENTERPRISES","148-794-643-000","141 M. Almeda St. San Roque, Pateros","","Tel No. 641-5643 * Fax No. 641-8115","Mr. Larry  Teylan"],
["ALBOS CONSTRUCTION CONTRACTOR","VAT REG: 199-881-000","17 Maremil Subd., Landayan, San Pedro, Laguna","","Tel. No. 556-3040 * Fax No.478-1215","Mr. Vicentito Albos"],
["ALLIED CONCRETE PRODUCT, INC.","000-376-254-000","1019 EDSA, Project 7, Quezon City","","Tel. No. 372-2064 * Fax No. 374-1398","Ms. Myra Ilao"],
["ANONAS CONSTRUCTION & IND'L CORP.","000-403-921-000","142 Kamias road Cor. Anonas St., Quezon City","","Tel. No. 922-7140 * Fax no. 926-6380","Ms. Aurora Libunao/Christian Hernandez"],
["ARNEL'S LAMBAT","NON  VAT : 437-564-512-000","Purok 1 Bucal, Calamba City, Laguna","Mobile No. 0906-644-5121","","Mr. John D. Carlos"],
["BELVEDERE CLEANVIRONMENT PHILS. INC.","437-564-512-000","Lot 103-117 Alabang Zapote Road cor. Filinvest Westgate Alabang","Mobile No. 0926-207-9722","","Ms. Sarah Arcilla"],
["BENTER N CUTTER MACHINERY CORPORATION","230-053-384-000","Warehouse #2 Blossoms Cmpd. Km. 25 Cupang Muntinlupa City","","Tel. No. 772-1001 * 772-5782 * 624-4704 Fax No. 772-1003","Mr. Rommel Terrago"],
["BENJAMIN N. CHAVEZ HAULING CONTRACTOR ","204-421-787-000-V","2260 P. Binay cor. Zansibar St., Brgy. San Isidro, Makati City","","Tel. No. 845-3268 * 843-6658 * 561-6886","Mr. Abel B. Peyra * Ms. Cristy Peyra"],
["BRYANT HEAVY EQUIPMENT TRADING","298-403-146-000","3/F 278 E. Dela Paz St., Sto. Nino Marikina City","","Tel No. 941-7777 * Telefax# 941-5555","Ms. Jean Magdaraog"],
["CHARLES & AARON  DESIGN CORP","VAT REG: 007-264-249-000","2nd Floor marinay Bldg.,84 M. L. Quezon St.,Brgy Wawa,Taguig City","","Tel. No. 219-3410","Ms. Vivian V. Tan"],
["CIPRIANO C GAGAN CONSTRUCTION","120-112-210-000","219 Negros St., Pitogo Makati City","","Tel. No. 985-5334","Mr. Cipriano Gagan / J.C. Mallari"],
["CIPS MARKETING","156-623-380-000","2894 Finlandia St., Brgy. San Isidro, Makati","","Tel. No. 889-2984 *  Fax No. 889-2986","Mr. Ely  Tajonera"],
["CONCRETE SOLUTION BUILDERS & SUPPLY ","101-906-813-000","36 L. Castillo St., Don Manuel, Quezon City ","","Tel. No. 741-7108 * 741-8702 * Fax No. 742-5230 ","Ms. Doris Toda"],
["DORON BUILDERS & CONSTRUCTION SUPPLIES LTD. CO.","210-087-021-000","Lot 8 Block 1 Jasmin St., Sampaguita Subd., Camarin, Caloocan City","","Tel. No. 440-8240 * 710-7914 * (0922)862-2881 * 962-2881 - 82 ","Ms. Shiella"],
["EQUIPMENT ENGINEERS, INC.","000-912-881-000","# 12 Manggahan St., Bagumbayan,Quezon City","","Tel. No. 635-08-43 loc 4082* Telefax No. 636-1152","Ms.L.A. Gamot/Ms. Emy"],
["ERCA ENTERPRISES ","NON VAT REG:   272-260-485-000","L17 B15 Daffodil St. Ciudad del Sol I,Brgy.San Juan,Taytay Rizal","","Tel No 0918-387-5287","Ermindo Cruz"],
["EDGE CONSTRUCTION SUPPLY","218-865-010-000","6 Pasig Blvd.Bagong ilog Pasig city ","","Tel. No. 584-7033-781-0920 340-4692","Anne de Tomas"],
["FORMAPLY INDUSTRIES, INC.","000-159-779-000","22 Scout Santiago, Brgy. Laging Handa, Quezon City","","Tel No. 374-7405 * Fax No. 373-0306","Engr. Boy Maglalang"],
["FELPORT INTERNATIONAL MARKETING","104-004-223-000","53 G. Victoria Ave., cor. 13th St New Manila Q.C","","Tel No. 362-9800 * 362-9804 Fax No.365-9030","Victor Jose Evangelista"],
["GIB METAL FABRICATION","428-001-838-000","Phase 2 Samagta Hiway 2000 Brgy San Juan Taytay Rizal","","Telephone No. 794-7591","Lilian Canaleta"],
["GRAN MARAMEDA TRADING","412-782-950-000","128 Int Gen Luna St, San Agustin Malabon City","","Telefax No. 647-3041 * 532-1918","Jet Castrence/Dianne"],
["GEOTESTING (INTERNATIONAL) INC.","000-120-091-000","5550-B Boyle St., Palanan, Makati City","","Tel No. 832-5297 * Fax# 832-5318","Mr. Dominador Fermin/Vernon"],
["G.S. GO BROS., INC.","000-344-812-000","2nd Floor GCK Bldg. 1226 G. Apacible St., Paco Mla","","Tel No. 521-8000 Fax No. 525-1569","Melchor Sy Go"],
["HAFELE PHILIPPINES, INC.","001-707-726-000","Levi Mariano Avenue, Brgy Ususan Taguig City","","Tel # 842-3353 loc. 710 * Fax # 571-3700","Ms. Mary Rose de Jesus"],
["HAN'S INFINITE TOOLS","103-891-689-001","Showroom 8007 Pioneer St. Brgy Kapitolyo Pasig City","","Tel. No. 634-8021 * Fax No. 634-8022","Dindo Agoncillo"],
["HILTI  PHILIPPINES  INC. ","004-777-324-000 ","2326 Pasong Tamo Ext., 1231 Makati City ","","Tel. no. 784-7100 * Fax No. 784-7101","Mr. Felimon 'Bong' Salvador"],
["JANO'S STEEL WORKS ENTERPRISES","256-258-831-000","Aguinaldo Hi-way, Buho, Silang Cavite","","Tel No. (046) 687-0382 ","Dominador V. Manahan"],
["J & B STEEL CENTER, INC.","005-305-029-000","J & B Bldg. km 53 South Maharlika National Highway Tulo Calamba Laguna","","Tel No. (049) 545-6099","Ms. Dulce Lood"],
["K.U.S. STRUCTURAL COMPONENTS, INC.","008-169-812-000","8501 A. Sandoval Ave., Pinagbuhatan Pasig City","","Tel No. 790-8000 * Fax No. 790-8050","Mr. Marvin Bautista"],
["KUYSEN ENTERPRISES, INC","000-300-149-000","236 E. Rodriguez Sr., Avenue, Brgy. Don Manuel 1113, Q.C","","Tel No. 740-7509 * 411-9671","Mr. Jhonny Ngo"],
["KLEENTRENDS MARKETING","VAT REG: 106-834-867-000","177 P.  Parada St., Sta. Lucia San Juan city","","Tel No.    734-6873","Ms. Tess Santos"],
["LC5 and Mach Enterprises, Inc.","VAT REG: 007-882-180-000","217 Quezon Avenue, Brgy Lourdes Quezon City","","Tel No.  731-8577 / 731-8445","Engr. Atong Cabel / Dina"],
["LEXARON MARKETING, INC","008-379-073-000","55 Moses St., Goodwill 2 Bagbag Novaliches Q. C.","","Tel #. 418-4225 * Fax# 930-0068","Mr. Deo Arias"],
["LEC STEEL MANUFACTURING CORP.","000-722-058-000","A. Bonifacio Ave., cor. Ligaya St., Balintawak, Manila","","Tel # 362-2443 * Fax #361-2410","Jully Lim / Arlene"],
["MALAYA LUMBER & CONSTRUCTION SUPPLY, INC."," 000-164-259-000","917 J. P. Rizal St., Poblacion, Makati City","","Tel. No. 899-7492 * Fax No. 899-7494","Mr. Jojo"],
["MANFEL PIASTRELLE CORPORATION","VAT REG: 238-339-809-000","2/F The Tile GALLERY Bldg Ortigas Ave Greenhills San Juan City","","Telefax No. 804-0188","Ms. Samantha Kate Balcuba"],
["MCJ KRYSCON CONSTRUCTION CORP.","008-564-981-000","Unit 501-C Valley Mansion Don Celso Tuazon Ave., Brgy San Juan Cainta","","Tel No. 697-9000 * Telefax: 661-0494","Tess Moreno"],
["MIDTOWN INDUSTRIAL SALES, INC.","004-446-832-000","32 MH del Pilar St., Caloocan City","","Tel. No. 361-6671 * Fax No. 365-9415 Mobile 0932-872-0482","Ms. Michelle Cailo Samia"],
["M.P. REG STRUCTURAL SYSTEM CORP.","008-893-087-000","Lot 47 Blk 215 Dollar St., Ph 8 North Fairview 2 Quezon City","","Tel. No. 417-9282","Ms. Lory Dalisay"],
["MAGNAPOWER CORPORATION","008-269-817-000","2461 Sunrise St., Tambo Parañaque City","","Tel. No. 653-7320","Ms. Sandra Silvano"],
["NEO ABE STEEL SALES, INC.","007-267-234-000","2813 Vergel St., Bryg 097 Pasay City","","Tel. No.  * 836-3676 * 834-8324 Fax No. 836-7625","Mr. Abe"],
["NEW SAN JOAQUIN LUMBER AND HARDWARE","229-188-041-000","317 A. Luna St., San Joaquin Pasig City","","Telefax No. 641-1407","Mr. Augusto Chua Jr."],
["NEW EZKLEEN PORTALET CORP.","006-965-982-000","2929 C. Raymundo Ave., Caniogan, Pasig City","","Tel. No. 643-3393 * Fax No. 643-3535","Ms. Marivic Carizal"],
["OBERLY  &  CO.,INC","VAT REG:  000-365-929-000","17- 19 Labo street, Quezon City","","Tel. No. 740-1594 * Fax No. 740-1603","Mr. Eduardo Viaplana "],
["OMNICO CONSORTIUM, INC.","004-640-862-000","Carlo Drive cor. Sta. Maria Drive, Manalac Ind'l. Subd.,","","Tel. No. 839-2728 * Fax No. 839-2732","Ms. Ivy Cendana/Ms. Dianne"],
["      PACMAC,INCORPORATED","000-166-229-000","   23 EDSA Guadalupe,Makati City","","   Tel. No. 882-3377-80;fax no. 882-1379","Mr. Engelebert E. Ramos"],
["PRIME STONE ROYALTY CORPORATION","008-466-492-000","55 Linaw St., Brgy St. Peter Quezon City","","Tel. No. 386-1392 Fax No. 254-5553","Ms. Carla"],
["PVM ELECTRO SYSTEM INC.","222-749-893-000","314 Baracca St., Brgy 282 Zone 26 San Nicolas Mla","","Tel No. 806-4636 * Fax No. 559-6926","Gigi Dela Peña"],
["PIONEER SPECIALTY BUILDING SYSTEMS, INC.","000-404-859-000","7-B Balete Drive Brgy. Mariana New Manila","","Tel. No.  * 414-1577 Fax No.414-1578","Richard Gubat/Mari Cris"],
["QUARTZ ENGINEERING SERVICES","105-334-021-000","Rm. 302 Campos Rueda Bldg., Urban Ave., Makati city","","Telefax No. 792-2934","Mr. Ricardo R. Ang Jr."],
["RAINBOW ROOF COLORCOTE MFG. CO., INC.","000-275-483-000","Room 306 Metropolitan Terraces Condominium, Dao St. cor. ","","Tel. No. 895-2005 * Fax No. 899-6697","Ms. Cecil Manalili * Ms. Donna"],
["RATIONAL LUMBER & HARDWARE","VAT REG:  003-926-414-000","713 - 717 EDSA, Cubao, Quezon City","","Tel. No. 727-0111 / 414-2954 * Fax No. 727-4390","Mr. Joseph"],
["RC NEW CHEMICAL RESOURCES, INC.","000-304-249-000","No. 73 C Jose St., Malibay, Pasay City","","Tel. No. 851-0486 * Fax No. 851-0498","Mr. Francis Reyes / Ms. Dannalyn Exconde"],
["REGAN INDUSTRIAL SALES, INC. ","000-365-856-000","No. 5 Harmony St., Grace village, Balintawak, Quezon City ","","Tel. No. 362-3173 * 362-3235 * Fax No. 361-3655  Loc. 114","Ms. Jessica"],
["R.S. TAYAG CONSTRUCTION","210-676-12-000","10 Ricardo St., Quezon City","","Tel. No.  928-7224 / 09298216443","Mr. Tayag"],
["RODSON BUILDERS","162-248-066-000","#89 Lapu-Lapu St., Doña Rosario Subd., Novaliches","","Telefax  419-5003 * 846-6690","Engr. Rodolfo Tecson"],
["        RRFC PEST CONTROL SERVICES","NON VAT 180-731-447-000","129 M. Almeda St.,San Roque,Pateros","","Telefax: 628-1929","Engr. Rodolfo Tecson"],
["STEEL ASIA MFG. CORP.","  004-480-523-000","2F B2 Bonifacio High St., Fort Bonifacio Global Taguig City","","Tel. No. 856-6888 * Fax No. 856-5555","Mr. Nicky Agcaoili/Ms. Ice"],
["SPARKTON CONSTRUCTION SUPPLIES, INC","008-543-557-000","8029 Honradez St., Olympia Makati City","","Tel Nos. 808-2554 * 823-0682 Fax #823-1851","Ms. Jhing S. Paz"],
["SUN AND EARTH CORPORATION","004-564-684-000","310 Midtown Executive U.N. Avenue Paco Manila","","Tel No. 624-6590 * 624-6654  * Mobile 0917-566-9569","Levy Esguerra"],
["SURIGAO DEVELOPMENT CORPORATION","000-231-579-001","ENZO Bldg., 399 Sen. Gil Puyat Ave., Makati City","","Tel. No. 890-96-97 * Fax No. 67005048","Mr. Calixto Te"],
["SUPERSONIC MFG. INC.","VAT REG:  000-232-731-000","238 F. Dulalla St., Bo. Lingunan, Valenzuela City","","Tel. No. 531-7310 * Fax No. 717-3275","Ms. Nelia"],
["SADOGUIO CONSTRUCTION CONTRACTOR","458-808-986-000","Marigold St., Lake View Putatan Muntinlupa","Mobile# 0935-181-8699","","Mr. Rey Sadoguio"],
["SAMITRADE INCORPORATED","005-588-682-000","158 G. Araneta Ave., Quezon City","","Tel. No. 622-2216 * Fax No. 365-0925","Ms. Janice Kong"],
["SWISHER PHILIPPINES, INC.","209-867-061-000","105 Sgt Catolos Immaculate Concepcion Cubao Q.C","","Tel. no. 726-9978 * 412-1955","Mr. Rainier Luarca"],
["TRINITY INSURANCE BROKERS, INC","000-456-062-000","5/F Philcom Bldg. 172 Salcedo Vill Makati City","","Tel No. 810-1653 to 60 Fax No. 892-5251","Ghina M. Clavejo"],
["W.C.A. GENERAL MERCHANDISE","VAT REG:  427-359-548","43 Ortigas Ave.Ext., Rosario, Pasig City","","Tel. No. 641-4498   Fax No. 900-2808","Tiffany Tan"],
["WILCON  DEPOT, INC.","VAT REG: 009-192-878-00000","90 E. Rodriguez Jr., Ave., Ugong, Norte Murphy Quezon City","","Tel. No. 634-8387 LOC. 1026/1027 Fax No. 638-7484","Ms.Marjonna  Pugales/Mr.kim"],
["WORLD HOME DEPOT CORP.","208-281-405-000","#20 Fortune Ave., cor. Santan Road Brgy. Fortune Marikina City","","Tel. No. 790-1000 loc 227 * Fax# 790-1015 ","Mr. Macky Mendezabal"],
["WYLER ENTERPRISES INC.","234-243-185-000","1300 Rizal Ave., Sta Cruz, Manila","","Tel. No.: 735-1022  Fax No.: 735-0855","Ms. Bong"],
["X-TEL ENTERPRISES","NON VAT REG:   264-968-656-000","Purok 7, Maunong, Calamba, Laguna","Cell No. 0908-638-8438","","Mr. Cristito Magpantay"],
["Y2K SCREW HARDWARE ","188-073-685-000","Unit A5, A6 No. 612 Pinaglabanan St., Pedro Cruz, San Juan, M. M.","","Tel. No. 724-1286 * 744-6746 * Fax No. 727-7549","Mr. Richard * Ms. Nina "],
["ZAM ENTERPRISES","108-309-664-000","907 Blk. 32 Kabisig, San Andres, Cainta Rizal ","","Tel. No. 656-4974 * Mobile No. 0926-6424892","Ms. Marizena Regio Osorio "],
["AMPHASE ELECTRICAL SERVICES","318-027-461-000","19 Pearl St., Pasig Greenland Village, Rosario, Pasig City",,"Telefax No. 719-0438","Mr. Ricardo R. Ang Jr."],
["885 STONE TOOLS TRADING","234-165-385-000","1079 D & E Edsa Balintawak Quezon City",,"Tel No. 414-5885 * Fax No. 414-6885","Ms. Sherly"],
["A. QUILLOY CONSTRUCTION","NON-VAT REG:  257-440-797-000","B 8 L21 JAGUAR ST.,MERCADO VILLAGE,PULONG STA. CRUZ,SAT. ROSA CITY,LAGUNA","Cell# 0917-8262136",,"Engr. Sally N. Lazaro"],
["AA ALUMINUM SUPPLY INC.","000-391-826-000","125 B. Serrano St. cor. 5th Ave. near EDSA Murphy Q.C",,"Tel. No.  911-5011","Ms. Rosa"],
["     ALVIN GLASS AND ALUMINUM INC.","000-369-454-000","   995 North Edsa,Veterans Village 1, Quezon City 1105",,"   Tel. No. 372-3611-15 * Fax No. 372-3616","Mr. Ponce Lee"],
["ALLGEMEINE BAU-CHEMIE PHILS., INC.","000-105-354-000","10/F Aslan Star Building, 2404 Asean Drive, Filinvest Corp. City",,"Tel. No. 842-6891  * Fax No. 842-7146","Bouvier A.  Corbilla"],
["ACT'S PATEROS ENTERPRISES","148-794-643-000","141 M. Almeda St. San Roque, Pateros",,"Tel No. 641-5643 * Fax No. 641-8115","Mr. Larry  Teylan"],
["ALBOS CONSTRUCTION CONTRACTOR","VAT REG: 199-881-000","17 Maremil Subd., Landayan, San Pedro, Laguna",,"Tel. No. 556-3040 * Fax No.478-1215","Mr. Vicentito Albos"],
["ALLIED CONCRETE PRODUCT, INC.","000-376-254-000","1019 EDSA, Project 7, Quezon City",,"Tel. No. 372-2064 * Fax No. 374-1398","Ms. Myra Ilao"],
["ANONAS CONSTRUCTION & IND'L CORP.","000-403-921-000","142 Kamias road Cor. Anonas St., Quezon City",,"Tel. No. 922-7140 * Fax no. 926-6380","Ms. Aurora Libunao/Christian Hernandez"],
["ARNEL'S LAMBAT","NON  VAT : 437-564-512-000","Purok 1 Bucal, Calamba City, Laguna","Mobile No. 0906-644-5121",,"Mr. John D. Carlos"],
["BELVEDERE CLEANVIRONMENT PHILS. INC.","437-564-512-000","Lot 103-117 Alabang Zapote Road cor. Filinvest Westgate Alabang","Mobile No. 0926-207-9722",,"Ms. Sarah Arcilla"],
["BENTER N CUTTER MACHINERY CORPORATION","230-053-384-000","Warehouse #2 Blossoms Cmpd. Km. 25 Cupang Muntinlupa City",,"Tel. No. 772-1001 * 772-5782 * 624-4704 Fax No. 772-1003","Mr. Rommel Terrago"],
["BENJAMIN N. CHAVEZ HAULING CONTRACTOR ","204-421-787-000-V","2260 P. Binay cor. Zansibar St., Brgy. San Isidro, Makati City",,"Tel. No. 845-3268 * 843-6658 * 561-6886","Mr. Abel B. Peyra * Ms. Cristy Peyra"],
["BRYANT HEAVY EQUIPMENT TRADING","298-403-146-000","3/F 278 E. Dela Paz St., Sto. Nino Marikina City",,"Tel No. 941-7777 * Telefax# 941-5555","Ms. Jean Magdaraog"],
["CHARLES & AARON  DESIGN CORP","VAT REG: 007-264-249-000","2nd Floor marinay Bldg.,84 M. L. Quezon St.,Brgy Wawa,Taguig City",,"Tel. No. 219-3410","Ms. Vivian V. Tan"],
["CIPRIANO C GAGAN CONSTRUCTION","120-112-210-000","219 Negros St., Pitogo Makati City",,"Tel. No. 985-5334","Mr. Cipriano Gagan / J.C. Mallari"],
["CIPS MARKETING","156-623-380-000","2894 Finlandia St., Brgy. San Isidro, Makati",,"Tel. No. 889-2984 *  Fax No. 889-2986","Mr. Ely  Tajonera"],
["CONCRETE SOLUTION BUILDERS & SUPPLY ","101-906-813-000","36 L. Castillo St., Don Manuel, Quezon City ",,"Tel. No. 741-7108 * 741-8702 * Fax No. 742-5230 ","Ms. Doris Toda"],
["DORON BUILDERS & CONSTRUCTION SUPPLIES LTD. CO.","210-087-021-000","Lot 8 Block 1 Jasmin St., Sampaguita Subd., Camarin, Caloocan City",,"Tel. No. 440-8240 * 710-7914 * (0922)862-2881 * 962-2881 - 82 ","Ms. Shiella"],
["EQUIPMENT ENGINEERS, INC.","000-912-881-000","# 12 Manggahan St., Bagumbayan,Quezon City",,"Tel. No. 635-08-43 loc 4082* Telefax No. 636-1152","Ms.L.A. Gamot/Ms. Emy"],
["ERCA ENTERPRISES ","NON VAT REG:   272-260-485-000","L17 B15 Daffodil St. Ciudad del Sol I,Brgy.San Juan,Taytay Rizal",,"Tel No 0918-387-5287","Ermindo Cruz"],
["EDGE CONSTRUCTION SUPPLY","218-865-010-000","6 Pasig Blvd.Bagong ilog Pasig city ",,"Tel. No. 584-7033-781-0920 340-4692","Anne de Tomas"],
["FORMAPLY INDUSTRIES, INC.","000-159-779-000","22 Scout Santiago, Brgy. Laging Handa, Quezon City",,"Tel No. 374-7405 * Fax No. 373-0306","Engr. Boy Maglalang"],
["FELPORT INTERNATIONAL MARKETING","104-004-223-000","53 G. Victoria Ave., cor. 13th St New Manila Q.C",,"Tel No. 362-9800 * 362-9804 Fax No.365-9030","Victor Jose Evangelista"],
["GIB METAL FABRICATION","428-001-838-000","Phase 2 Samagta Hiway 2000 Brgy San Juan Taytay Rizal",,"Telephone No. 794-7591","Lilian Canaleta"],
["GRAN MARAMEDA TRADING","412-782-950-000","128 Int Gen Luna St, San Agustin Malabon City",,"Telefax No. 647-3041 * 532-1918","Jet Castrence/Dianne"],
["GEOTESTING (INTERNATIONAL) INC.","000-120-091-000","5550-B Boyle St., Palanan, Makati City",,"Tel No. 832-5297 * Fax# 832-5318","Mr. Dominador Fermin/Vernon"],
["G.S. GO BROS., INC.","000-344-812-000","2nd Floor GCK Bldg. 1226 G. Apacible St., Paco Mla",,"Tel No. 521-8000 Fax No. 525-1569","Melchor Sy Go"],
["HAFELE PHILIPPINES, INC.","001-707-726-000","Levi Mariano Avenue, Brgy Ususan Taguig City",,"Tel # 842-3353 loc. 710 * Fax # 571-3700","Ms. Mary Rose de Jesus"],
["HAN'S INFINITE TOOLS","103-891-689-001","Showroom 8007 Pioneer St. Brgy Kapitolyo Pasig City",,"Tel. No. 634-8021 * Fax No. 634-8022","Dindo Agoncillo"],
["HILTI  PHILIPPINES  INC. ","004-777-324-000 ","2326 Pasong Tamo Ext., 1231 Makati City ",,"Tel. no. 784-7100 * Fax No. 784-7101","Mr. Felimon 'Bong' Salvador"],
["JANO'S STEEL WORKS ENTERPRISES","256-258-831-000","Aguinaldo Hi-way, Buho, Silang Cavite",,"Tel No. (046) 687-0382 ","Dominador V. Manahan"],
["J & B STEEL CENTER, INC.","005-305-029-000","J & B Bldg. km 53 South Maharlika National Highway Tulo Calamba Laguna",,"Tel No. (049) 545-6099","Ms. Dulce Lood"],
["K.U.S. STRUCTURAL COMPONENTS, INC.","008-169-812-000","8501 A. Sandoval Ave., Pinagbuhatan Pasig City",,"Tel No. 790-8000 * Fax No. 790-8050","Mr. Marvin Bautista"],
["KUYSEN ENTERPRISES, INC","000-300-149-000","236 E. Rodriguez Sr., Avenue, Brgy. Don Manuel 1113, Q.C",,"Tel No. 740-7509 * 411-9671","Mr. Jhonny Ngo"],
["KLEENTRENDS MARKETING","VAT REG: 106-834-867-000","177 P.  Parada St., Sta. Lucia San Juan city",,"Tel No.    734-6873","Ms. Tess Santos"],
["LC5 and Mach Enterprises, Inc.","VAT REG: 007-882-180-000","217 Quezon Avenue, Brgy Lourdes Quezon City",,"Tel No.  731-8577 / 731-8445","Engr. Atong Cabel / Dina"],
["LEXARON MARKETING, INC","008-379-073-000","55 Moses St., Goodwill 2 Bagbag Novaliches Q. C.",,"Tel #. 418-4225 * Fax# 930-0068","Mr. Deo Arias"],
["LEC STEEL MANUFACTURING CORP.","000-722-058-000","A. Bonifacio Ave., cor. Ligaya St., Balintawak, Manila",,"Tel # 362-2443 * Fax #361-2410","Jully Lim / Arlene"],
["MALAYA LUMBER & CONSTRUCTION SUPPLY, INC."," 000-164-259-000","917 J. P. Rizal St., Poblacion, Makati City",,"Tel. No. 899-7492 * Fax No. 899-7494","Mr. Jojo"],
["MANFEL PIASTRELLE CORPORATION","VAT REG: 238-339-809-000","2/F The Tile GALLERY Bldg Ortigas Ave Greenhills San Juan City",,"Telefax No. 804-0188","Ms. Samantha Kate Balcuba"],
["MCJ KRYSCON CONSTRUCTION CORP.","008-564-981-000","Unit 501-C Valley Mansion Don Celso Tuazon Ave., Brgy San Juan Cainta",,"Tel No. 697-9000 * Telefax: 661-0494","Tess Moreno"],
["MIDTOWN INDUSTRIAL SALES, INC.","004-446-832-000","32 MH del Pilar St., Caloocan City",,"Tel. No. 361-6671 * Fax No. 365-9415 Mobile 0932-872-0482","Ms. Michelle Cailo Samia"],
["M.P. REG STRUCTURAL SYSTEM CORP.","008-893-087-000","Lot 47 Blk 215 Dollar St., Ph 8 North Fairview 2 Quezon City",,"Tel. No. 417-9282","Ms. Lory Dalisay"],
["MAGNAPOWER CORPORATION","008-269-817-000","2461 Sunrise St., Tambo Parañaque City",,"Tel. No. 653-7320","Ms. Sandra Silvano"],
["NEO ABE STEEL SALES, INC.","007-267-234-000","2813 Vergel St., Bryg 097 Pasay City",,"Tel. No.  * 836-3676 * 834-8324 Fax No. 836-7625","Mr. Abe"],
["NEW SAN JOAQUIN LUMBER AND HARDWARE","229-188-041-000","317 A. Luna St., San Joaquin Pasig City",,"Telefax No. 641-1407","Mr. Augusto Chua Jr."],
["NEW EZKLEEN PORTALET CORP.","006-965-982-000","2929 C. Raymundo Ave., Caniogan, Pasig City",,"Tel. No. 643-3393 * Fax No. 643-3535","Ms. Marivic Carizal"],
["OBERLY  &  CO.,INC","VAT REG:  000-365-929-000","17- 19 Labo street, Quezon City",,"Tel. No. 740-1594 * Fax No. 740-1603","Mr. Eduardo Viaplana "],
["OMNICO CONSORTIUM, INC.","004-640-862-000","Carlo Drive cor. Sta. Maria Drive, Manalac Ind'l. Subd.,",,"Tel. No. 839-2728 * Fax No. 839-2732","Ms. Ivy Cendana/Ms. Dianne"],
["      PACMAC,INCORPORATED","000-166-229-000","   23 EDSA Guadalupe,Makati City",,"   Tel. No. 882-3377-80;fax no. 882-1379","Mr. Engelebert E. Ramos"],
["PRIME STONE ROYALTY CORPORATION","008-466-492-000","55 Linaw St., Brgy St. Peter Quezon City",,"Tel. No. 386-1392 Fax No. 254-5553","Ms. Carla"],
["PVM ELECTRO SYSTEM INC.","222-749-893-000","314 Baracca St., Brgy 282 Zone 26 San Nicolas Mla",,"Tel No. 806-4636 * Fax No. 559-6926","Gigi Dela Peña"],
["PIONEER SPECIALTY BUILDING SYSTEMS, INC.","000-404-859-000","7-B Balete Drive Brgy. Mariana New Manila",,"Tel. No.  * 414-1577 Fax No.414-1578","Richard Gubat/Mari Cris"],
["QUARTZ ENGINEERING SERVICES","105-334-021-000","Rm. 302 Campos Rueda Bldg., Urban Ave., Makati city",,"Telefax No. 792-2934","Mr. Ricardo R. Ang Jr."],
["RAINBOW ROOF COLORCOTE MFG. CO., INC.","000-275-483-000","Room 306 Metropolitan Terraces Condominium, Dao St. cor. ",,"Tel. No. 895-2005 * Fax No. 899-6697","Ms. Cecil Manalili * Ms. Donna"],
["RATIONAL LUMBER & HARDWARE","VAT REG:  003-926-414-000","713 - 717 EDSA, Cubao, Quezon City",,"Tel. No. 727-0111 / 414-2954 * Fax No. 727-4390","Mr. Joseph"],
["RC NEW CHEMICAL RESOURCES, INC.","000-304-249-000","No. 73 C Jose St., Malibay, Pasay City",,"Tel. No. 851-0486 * Fax No. 851-0498","Mr. Francis Reyes / Ms. Dannalyn Exconde"],
["REGAN INDUSTRIAL SALES, INC. ","000-365-856-000","No. 5 Harmony St., Grace village, Balintawak, Quezon City ",,"Tel. No. 362-3173 * 362-3235 * Fax No. 361-3655  Loc. 114","Ms. Jessica"],
["R.S. TAYAG CONSTRUCTION","210-676-12-000","10 Ricardo St., Quezon City",,"Tel. No.  928-7224 / 09298216443","Mr. Tayag"],
["RODSON BUILDERS","162-248-066-000","#89 Lapu-Lapu St., Doña Rosario Subd., Novaliches",,"Telefax  419-5003 * 846-6690","Engr. Rodolfo Tecson"],
["        RRFC PEST CONTROL SERVICES","NON VAT 180-731-447-000","129 M. Almeda St.,San Roque,Pateros",,"Telefax: 628-1929","Engr. Rodolfo Tecson"],
["STEEL ASIA MFG. CORP.","  004-480-523-000","2F B2 Bonifacio High St., Fort Bonifacio Global Taguig City",,"Tel. No. 856-6888 * Fax No. 856-5555","Mr. Nicky Agcaoili/Ms. Ice"],
["SPARKTON CONSTRUCTION SUPPLIES, INC","008-543-557-000","8029 Honradez St., Olympia Makati City",,"Tel Nos. 808-2554 * 823-0682 Fax #823-1851","Ms. Jhing S. Paz"],
["SUN AND EARTH CORPORATION","004-564-684-000","310 Midtown Executive U.N. Avenue Paco Manila",,"Tel No. 624-6590 * 624-6654  * Mobile 0917-566-9569","Levy Esguerra"],
["SURIGAO DEVELOPMENT CORPORATION","000-231-579-001","ENZO Bldg., 399 Sen. Gil Puyat Ave., Makati City",,"Tel. No. 890-96-97 * Fax No. 67005048","Mr. Calixto Te"],
["SUPERSONIC MFG. INC.","VAT REG:  000-232-731-000","238 F. Dulalla St., Bo. Lingunan, Valenzuela City",,"Tel. No. 531-7310 * Fax No. 717-3275","Ms. Nelia"],
["SADOGUIO CONSTRUCTION CONTRACTOR","458-808-986-000","Marigold St., Lake View Putatan Muntinlupa","Mobile# 0935-181-8699",,"Mr. Rey Sadoguio"],
["SAMITRADE INCORPORATED","005-588-682-000","158 G. Araneta Ave., Quezon City",,"Tel. No. 622-2216 * Fax No. 365-0925","Ms. Janice Kong"],
["SWISHER PHILIPPINES, INC.","209-867-061-000","105 Sgt Catolos Immaculate Concepcion Cubao Q.C",,"Tel. no. 726-9978 * 412-1955","Mr. Rainier Luarca"],
["TRINITY INSURANCE BROKERS, INC","000-456-062-000","5/F Philcom Bldg. 172 Salcedo Vill Makati City",,"Tel No. 810-1653 to 60 Fax No. 892-5251","Ghina M. Clavejo"],
["W.C.A. GENERAL MERCHANDISE","VAT REG:  427-359-548","43 Ortigas Ave.Ext., Rosario, Pasig City",,"Tel. No. 641-4498   Fax No. 900-2808","Tiffany Tan"],
["WILCON  DEPOT, INC.","VAT REG: 009-192-878-00000","90 E. Rodriguez Jr., Ave., Ugong, Norte Murphy Quezon City",,"Tel. No. 634-8387 LOC. 1026/1027 Fax No. 638-7484","Ms.Marjonna  Pugales/Mr.kim"],
["WORLD HOME DEPOT CORP.","208-281-405-000","#20 Fortune Ave., cor. Santan Road Brgy. Fortune Marikina City",,"Tel. No. 790-1000 loc 227 * Fax# 790-1015 ","Mr. Macky Mendezabal"],
["WYLER ENTERPRISES INC.","234-243-185-000","1300 Rizal Ave., Sta Cruz, Manila",,"Tel. No.: 735-1022  Fax No.: 735-0855","Ms. Bong"],
["X-TEL ENTERPRISES","NON VAT REG:   264-968-656-000","Purok 7, Maunong, Calamba, Laguna","Cell No. 0908-638-8438",,"Mr. Cristito Magpantay"],
["Y2K SCREW HARDWARE ","188-073-685-000","Unit A5, A6 No. 612 Pinaglabanan St., Pedro Cruz, San Juan, M. M.",,"Tel. No. 724-1286 * 744-6746 * Fax No. 727-7549","Mr. Richard * Ms. Nina "],
["ZAM ENTERPRISES","108-309-664-000","907 Blk. 32 Kabisig, San Andres, Cainta Rizal ",,"Tel. No. 656-4974 * Mobile No. 0926-6424892","Ms. Marizena Regio Osorio "]];

var item_count = 0;
var projects = [];
var suppliers = [];

(function($){
  $(function(){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'yyyy-mm-dd'
    });

    $('select').material_select();

    $('.tooltipped').tooltip({delay: 50});

    load_projects();
    load_suppliers();

    $('.add-project').click(function(){
      clear_add_project();
      $('.add-project-modal').openModal();
      $('.add-project-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
    });

    $('.add-supplier').click(function(){
      Materialize.toast('This is currently disabled to make way for the supplier list', 5000);


      clear_add_supplier();
      $('.add-supplier-modal').openModal();
      $('.add-supplier-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
    });

    $('.add-po').click(function(){
      clear_add_po();
      var pid = this.id.split(/-(.+)/)[1];
      var project = find_project_code(pid);
      set_add_po(project);
      $('.add-po-modal').openModal();
      $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
    });

    $('.add-project-modal-btn-add').click(function(){
      if(!check_project_input()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.add-project-modal').openModal();
          $('.add-project-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');

        },300);
      }
      else{
        project = get_add_project_input(); 
        add_project(project);
        clear_add_project();
      }
    });

    $('.add-supplier-modal-btn-add').click(function(){
      if(!check_supplier_input()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.add-supplier-modal').openModal();
          $('.add-supplier-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
        },300);
      }
      else{
        supplier = get_add_supplier_input(); 
        add_supplier(supplier);
        clear_add_supplier();
      }
    });

    $('.add-po-modal-btn-add').click(function(){
      if(!check_po_input()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.add-po-modal').openModal();
          $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
        },300);
      }
      else{
        po = get_add_po_input(); 
        add_po(po);
        clear_add_po();
      }
    });

    $('.add-po-modal-btn-amend').click(function(){
      if(!check_po_input()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.add-po-modal').openModal();
          $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
        },300);
      }
      else{
        po = get_amend_po_input(); 
        amend_po(po); 
        clear_add_po();
      }
    });

    $('.add-po-modal-btn-print').click(function(){
      print_po($('#hidden-po-number').val());
    });

    $('.add-item').click(function(){
      if(!check_item_input()){
        Materialize.toast('Some fields are blank.',5000);
      }
      else{
        item = get_add_item_input();
        add_item(item);
        clear_add_item();
      }
    });

    $('.project-list').on('click', '.open-project', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var project = find_project_code(pid);
      if(project != null) {
        set_view_project(project);
        set_add_po(project);
        $('.view-project-modal').openModal();
        $('.view-project-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
      }
      else Materialize.toast('Project code '+pid+' cannot be found.',5000);
    });

    $('.supplier-list').on('click', '.open-supplier', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var supplier = find_supplier_code(pid);
      if(supplier != null) {
        set_view_supplier(supplier);
        $('.view-supplier-modal').openModal();
        $('.view-supplier-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
      }
      else Materialize.toast('Supplier id '+pid+' cannot be found.',5000);
    });

    $('.po-list').on('click', '.open-po', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var po = find_po_code(pid);
      if(po != null) {
        po['po-number'] = pid;
        clear_add_po();
        set_view_po(po);
        $('.add-po-modal').openModal();
        $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');

      }
      else Materialize.toast('PO code '+pid+' cannot be found.',5000);
    });

    $('.po-list').on('click', '.amend-po', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var po = find_po_code(pid);
      if(po != null) {
        po['po-number'] = pid;
        clear_add_po();
        set_amend_po(po);
        $('.add-po-modal').openModal();
        $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
      }
      else Materialize.toast('PO code '+pid+' cannot be found.',5000);
    });

    $('.project-list').on('click', '.delete-project', function(){
      var pid = this.id.split(/-(.+)/)[1]
      var project = find_project_code(pid);
      if(project != null) {
        con = confirm('Are you sure you want to delete Project: '+project.name+'('+project['project-code']+')?\nThis cannot be undone.');
        if(con){
          delete_project(project);
        }
      }
      else Materialize.toast('Project code '+pid+' cannot be found.',5000);
    });

    $('.po-list').on('click', '.delete-po', function(){
      var pid = this.id.split(/-(.+)/)[1]
      var po = find_po_code(pid);
      if(po != null) {
        con = confirm('Are you sure you want to delete PO# '+pid+'?\nThis cannot be undone.');
        if(con){
          delete_po(pid);
        }
      }
      else Materialize.toast('PO number '+pid+' cannot be found.',5000);
    });

    $('.supplier-list').on('click', '.delete-supplier', function(){
      var pid = this.id.split(/-(.+)/)[1]
      var supplier = find_supplier_code(pid);
      if(supplier != null) {
        con = confirm('Are you sure you want to delete Supplier: '+supplier.name+'?\nThis cannot be undone.');
        if(con){
          delete_supplier(supplier);
        }
      }
      else Materialize.toast('Supplier id '+pid+' cannot be found.',5000);
    });

    $('.item-list').on('click', '.delete-item', function(){
      var total = parseFloat($('.add-po-input-total-amount').html());
      total -= parseFloat(this.id);
      $('.add-po-input-total-amount').html(parseFloat(total).toFixed(2));
      $(this).parent().parent().remove();
    });

    $('.view-project-modal-btn-save').click(function(){
      if(!check_project_edit()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.view-project-modal').openModal();
          $('.view-project-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
        },300);
      }
      else{
        project = get_edited_project();
        if(find_project_code(project['project-code']) != null){
          edit_project(project);
        }
        else Materialize.toast('Project code '+pid+' cannot be found.',5000); 
      }
    });

    $('.view-supplier-modal-btn-save').click(function(){
      if(!check_supplier_edit()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.view-supplier-modal').openModal();
          $('.view-supplier-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
        },300);
      }
      else{
        supplier = get_edited_supplier();
        if(find_supplier_code(supplier['supplier-code']) != null){
          edit_supplier(supplier);
        }
        else Materialize.toast('Supplier id '+pid+' cannot be found.',5000); 
      }
    });

    $('.generate-project').click(generate_project);
    $('.generate-supplier').click(generate_supplier);
    $('.generate-po').click(generate_po);
    $('.generate-item').click(generate_item);

    $('.po-generator').click(function(){
      clear_add_po();
      $('.add-po-modal').openModal();
      $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
    });

    $('.po-summary').click(function(){
      console.log('232');
      create_project_options2();
      $('.po-summary-modal').openModal();
    });

    $('input[type=radio][name=po-summary-input-type]').change(function() {
      if (this.value == 'billing') {
        $('.input-date-div').show(0);
      }
      else if (this.value == 'supplier') {
        $('.input-date-div').hide(0);
      }
    });

    $('.po-summary-input').change(function() {
      if(check_po_summary_input()){
        if($("input[name='po-summary-input-type']:checked").val() == 'billing'){
          get_billing_summary(find_project_code($('#po-summary-input-project').val()));
        }
        else{
          get_supplier_summary(find_project_code($('#po-summary-input-project').val()));
        }
      }
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space

function get_billing_summary(project){
  $('.po-summary-table').show();
  $('.po-summary-list').html('');
  $('.po-summary-varying-th').html('Date');

  var inputdate = $('#po-summary-input-date').val();

  var curr = new Date(inputdate);
  var subtotal = 0;
  var total = 0;
  for(var key in project['pos']){
    if(project['pos'].hasOwnProperty(key)){
      var amount = (project['pos'][key]['status'] == 0)? '-----': parseFloat(project['pos'][key]['total-amount']).toFixed(2);
      var d = new Date(project['pos'][key]['date']);


      console.log('key: '+key+'\n curr: '+curr+'\n d:'+d);

      if(curr == new Date(inputdate) || subtotal <= 0){
        console.log('AAA');
        //curr = d;
        if(amount != '-----'){
          subtotal += parseFloat(amount);
        }
      }
      else if(d > curr){
        console.log('BBB');
        if(subtotal != '-----') total += parseFloat(subtotal);
        $('.po-summary-list').append(
          '<tr>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td class="right-align">'+subtotal.toFixed(2)+'</td>'+
          '</tr>'
        );
        subtotal = 0;
        //curr = d;
        if(amount != '-----'){
          subtotal += parseFloat(amount);
        }
      }
      else if(amount != '-----'){
        console.log('CCC');
        subtotal += parseFloat(amount);
      }

      console.log('\n');

      $('.po-summary-list').append(
        '<tr>'+
          '<td>'+project['pos'][key]['date']+'</td>'+
          '<td>'+key+'</td>'+
          '<td class="right-align">'+amount+'</td>'+
          '<td></td>'+
        '</tr>'
      );
    }
  }
  total += parseFloat(subtotal);
  $('.po-summary-list').append(
    '<tr style="border-bottom:1px solid black;">'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td class="right-align">'+subtotal.toFixed(2)+'</td>'+
    '</tr>'
  );
  $('.po-summary-list').append(
    '<tr style="border-bottom:1px solid black;">'+
      '<td></td>'+
      '<td></td>'+
      '<td><strong>GRAND TOTAL</strong></td>'+
      '<td class="right-align">'+total.toFixed(2)+'</td>'+
    '</tr>'
  );
}

function get_supplier_summary(project){
  $('.po-summary-table').show();
  $('.po-summary-list').html('');
  $('.po-summary-varying-th').html('Supplier');

  var curr = null;
  var subtotal = 0;
  var total = 0;

  var list = project['pos'];
  keysSorted = Object.keys(list).sort(function(a,b){return list[a].to-list[b].to})

  for(var i=0; i<keysSorted.length; i++){

    key = keysSorted[i];
    if(project['pos'].hasOwnProperty(key)){


      var supplier = find_supplier_code(project['pos'][key]['to']);
      var amount = (project['pos'][key]['status'] == 0)? '-----': parseFloat(project['pos'][key]['total-amount']).toFixed(2);

      if(curr == null){
        curr = supplier;
        if(subtotal != '-----') total += parseFloat(subtotal);
      }
      else if(supplier != curr){
        if(subtotal != '-----') total += parseFloat(subtotal);
        $('.po-summary-list').append(
          '<tr>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td class="right-align">'+subtotal.toFixed(2)+'</td>'+
          '</tr>'
        );
        subtotal = 0;
        curr = supplier;
        subtotal += parseFloat(amount);
      }
      else if(amount != '-----'){
        subtotal += parseFloat(amount);
      }

      $('.po-summary-list').append(
        '<tr>'+
          '<td>'+supplier.name+'</td>'+
          '<td>'+key+'</td>'+
          '<td class="right-align">'+amount+'</td>'+
          '<td></td>'+
        '</tr>'
      );
    }
  }
  if(subtotal != '-----') total += parseFloat(subtotal);
  $('.po-summary-list').append(
    '<tr style="border-bottom:1px solid black;">'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td class="right-align">'+subtotal.toFixed(2)+'</td>'+
    '</tr>'
  );
  $('.po-summary-list').append(
    '<tr style="border-bottom:1px solid black;">'+
      '<td></td>'+
      '<td></td>'+
      '<td><strong>GRAND TOTAL</strong></td>'+
      '<td class="right-align">'+total.toFixed(2)+'</td>'+
    '</tr>'
  );
}

function check_po_summary_input(){
  var input = $('#po-summary-input-project').val();
  if(input.trim() == ''){
    return false;
  }

  if (!$("input[name='po-summary-input-type']:checked").val()) {
    return false;
  }
  else {
    if($("input[name='po-summary-input-type']:checked").val() == 'billing'){
      var input = $('#po-summary-input-date').val();
      if(input.trim() == ''){
        return false;
      }
    }
  }
  return true;
}

function print_po(code){
  po = find_po_code(code);
  po['to'] = find_supplier_code(po['to']);
  po['deliver-to'] = find_project_code(po['deliver-to']);
  po['deliver-to']['pos'] = null;
  $('#hif').attr('src', 'print.html?po='+JSON.stringify(po));
  load_projects();
}

function add_project(project){
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
  $('.project-list').append(
    '<li id="'+project['project-code']+'" class="collection-item project">'+project['name']+'<span class="right teal-text">'+
      '<i id="open-'+project['project-code']+'" class="material-icons clickable open-project">mode_edit</i> '+
      '<i id="delete-'+project['project-code']+'" class="material-icons clickable delete-project">delete</i>'+
    '</span></li>'
  );
  Materialize.toast('Successfully added project',3000);
}

function add_supplier(supplier){
  suppliers.push(supplier);
  localStorage.setItem('suppliers', JSON.stringify(arr_to_obj(suppliers)));
  $('.supplier-list').append(
    '<li id="'+supplier['supplier-code']+'" class="collection-item supplier">'+supplier['name']+'<span class="right teal-text">'+
      '<i id="open-'+supplier['supplier-code']+'" class="material-icons clickable open-supplier">mode_edit</i> '+
      '<i id="delete-'+supplier['supplier-code']+'" class="material-icons clickable delete-supplier">delete</i>'+
    '</span></li>'
  );
  Materialize.toast('Successfully added supplier',3000);
}

function add_item(item){

  var subtotal = parseFloat(parseFloat(item['unit-price'])*parseInt(item['quantity'])).toFixed(2);

  $('.item-list').append(
    '<tr>'+
      '<td>'+item['quantity']+'</td>'+
      '<td>'+item['unit']+'</td>'+
      '<td>'+item['description']+'</td>'+
      '<td><input type="checkbox" id="a'+subtotal+'" /><label for="a'+subtotal+'"></label></td>'+
      '<td><input type="checkbox" id="b'+subtotal+'" /><label for="b'+subtotal+'"></label></td>'+
      '<td><input type="checkbox" id="c'+subtotal+'" /><label for="c'+subtotal+'"></label></td>'+
      '<td>'+item['unit-price']+'</td>'+
      '<td>'+subtotal+'</td>'+
      '<td><i id="'+subtotal+'" class="material-icons clickable delete-item">close</i></td>'+
    '</tr>'
  );

  var total = parseFloat($('.add-po-input-total-amount').html()).toFixed(2);
  total = parseFloat(parseFloat(total) + parseFloat(subtotal)).toFixed(2);
  $('.add-po-input-total-amount').html(total);

  Materialize.toast('Successfully added item',3000);
}

function add_po(po){
  var project = find_project_code(po['deliver-to']);
  if(project != null){
    var i = 0;
    while(project['pos'][po['deliver-to']+three_digits(i)] != undefined){
      i++;
    }
    po['po-number'] = po['deliver-to']+three_digits(i);
    po['status'] = '1';
    project['pos'][po['po-number']] = po;
    localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
    $('.po-list').append(
      '<tr id="'+po['po-number']+'">'+
        '<td>'+po['po-number']+'</td>'+ 
        '<td>'+po['total-amount']+'</td>'+
        '<td>'+po['date']+'</td>'+
        '<td>'+
          '<i id="open-'+po['po-number']+'" class="material-icons clickable tooltipped open-po" data-position="top" data-delay="20" data-tooltip="Open">open_in_browser</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="amend-'+po['po-number']+'" class="material-icons clickable tooltipped amend-po" data-position="top" data-delay="20" data-tooltip="Amend">build</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="delete-'+po['po-number']+'" class="material-icons clickable tooltipped delete-po" data-position="top" data-delay="20" data-tooltip="Delete">delete</i>'+
        '</td>'+
      '</tr>'
    );
    print_po(po['po-number']);
  }
  else Materialize.toast('Project code '+po['deliver-to']+' cannot be found.',5000); 
}

function amend_po(po){
  var project = find_project_code(po['deliver-to']);
  var parent = po['po-number'].substring(0,9); 
  if(project != null){
    $('tr#'+po['po-number']+'>td')[1].innerHTML = '-----';
    $('tr#'+parent+'>td')[1].innerHTML = '-----';

    var i = 0;
    var alpha = ['A', 'B', 'C', 'D', 'E','F','G','H','I'];//todo improve
    while(project['pos'][parent+alpha[i]] != undefined){
      $('tr#'+parent+alpha[i]+'>td')[1].innerHTML = '-----';
      $('tr#'+parent+alpha[i]+'>td')[1].innerHTML = '-----';
      project['pos'][parent+alpha[i]]['status'] = 0;
      i++;
    }
    po['po-number'] = parent+alpha[i];
    po['status'] = 1;
    project['pos'][po['po-number']] = po;
    project['pos'][parent]['status'] = 0;

    localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
    $('.po-list').append(
      '<tr id="'+po['po-number']+'">'+
        '<td>'+po['po-number']+'</td>'+ 
        '<td>'+po['total-amount']+'</td>'+
        '<td>'+po['date']+'</td>'+
        '<td>'+
          '<i id="open-'+po['po-number']+'" class="material-icons clickable tooltipped open-po" data-position="top" data-delay="20" data-tooltip="Open">open_in_browser</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="amend-'+po['po-number']+'" class="material-icons clickable tooltipped amend-po" data-position="top" data-delay="20" data-tooltip="Amend">build</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="delete-'+po['po-number']+'" class="material-icons clickable tooltipped delete-po" data-position="top" data-delay="20" data-tooltip="Delete">delete</i>'+
        '</td>'+
      '</tr>'
    );

    //needs improvement
    var $table=$('.po-list');
    var rows = $table.find('tr').get();
    rows.sort(function(a, b) {
      var keyA = $(a).attr('id');
      var keyB = $(b).attr('id');
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    $.each(rows, function(index, row) {
      $table.children('tbody').append(row);
    });



    //urgent sort .po-list by po-number
    print_po(po['po-number']);
  }
  else Materialize.toast('Project code '+po['deliver-to']+' cannot be found.',5000); 
}

function edit_project(project){
  $.each(projects, function(index, p){
      if(p['project-code'] == project['project-code']){
        keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
        for(var i=0; i<keys.length; i+=1){
          projects[index][keys[i]] = project[keys[i]];
        }
        //projects[index] = project;
        localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
        Materialize.toast('Successfully edited project',3000);
        return;
      }
  });
}

function edit_supplier(supplier){
  $.each(suppliers, function(index, p){
      if(p['supplier-code'] == supplier['supplier-code']){
        suppliers[index] = supplier;
        localStorage.setItem('suppliers', JSON.stringify(arr_to_obj(suppliers)));
        Materialize.toast('Successfully edited supplier',3000);
        return;
      }
  });
}

function delete_project(project){
  projects = projects.filter(function( obj ) {
    return obj['project-code'] !== project['project-code'];
  });
  localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
  $('.project-list>#'+project['project-code']).remove();
  Materialize.toast('Successfully deleted project',3000);
}

function delete_supplier(supplier){
  suppliers = suppliers.filter(function( obj ) {
    return obj['supplier-code'] !== supplier['supplier-code'];
  });
  localStorage.setItem('suppliers', JSON.stringify(arr_to_obj(suppliers)));
  $('.supplier-list>#'+supplier['supplier-code']).remove();
  Materialize.toast('Successfully deleted supplier',3000);
}

function delete_po(code){
  var project_code = code.substring(0,6);
  for(var i=0; i<projects.length; i++){
    if(projects[i]['project-code'] == project_code){
      delete projects[i]['pos'][code];
      break;
    }
  }
  localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
  $('.po-list>#'+code).remove();
  Materialize.toast('Successfully deleted PO',3000);
}

function load_projects(){
  $('.project-list').html('');
  projects = [];
  if(localStorage.getItem('projects') != null){
    projects = obj_to_arr(JSON.parse(localStorage.getItem('projects')));
    $.each(projects, function(index, project){
      $('.project-list').append(
        '<li id="'+project['project-code']+'" class="collection-item project">'+project['name']+'<span class="right teal-text">'+
          '<i id="open-'+project['project-code']+'" class="material-icons clickable open-project">mode_edit</i> '+
          '<i id="delete-'+project['project-code']+'" class="material-icons clickable delete-project">delete</i>'+
        '</span></li>'
      );
    });
  }
}

function load_suppliers(){
/*  if(localStorage.getItem('suppliers') != null){
    suppliers = obj_to_arr(JSON.parse(localStorage.getItem('suppliers')));
    $.each(suppliers, function(index, supplier){
      $('.supplier-list').append(
        '<li id="'+supplier['supplier-code']+'" class="collection-item supplier">'+supplier['name']+'<span class="right teal-text">'+
          '<i id="open-'+supplier['supplier-code']+'" class="material-icons clickable open-supplier">mode_edit</i> '+
          '<i id="delete-'+supplier['supplier-code']+'" class="material-icons clickable delete-supplier">delete</i>'+
        '</span></li>'
      );
    });
  }*/

  suppliers = [];
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code']
  for(var i=0; i<supplierlist.length; i++){
    s = {};
    sc = generate_suppliercode();
    while(sc_is_existing(sc)){ 
      sc = generate_suppliercode();
    }
    s['name'] = supplierlist[i][0];
    s['vat-reg'] = supplierlist[i][1];
    s['address'] = supplierlist[i][2];
    s['mobile-number'] = supplierlist[i][4];
    s['contact-person'] = supplierlist[i][5];
    s['supplier-code'] = sc;

    suppliers.push(s);
  }



  $.each(suppliers, function(index, supplier){
      $('.supplier-list').append(
        '<li id="'+supplier['supplier-code']+'" class="collection-item supplier">'+supplier['name']+'<span class="right teal-text">'+
          '<i id="open-'+supplier['supplier-code']+'" class="material-icons clickable open-supplier">mode_edit</i> '+
          '<i id="delete-'+supplier['supplier-code']+'" class="material-icons clickable delete-supplier">delete</i>'+
        '</span></li>'
      );
    });

}

function check_project_input(){
  var p = '#add-project-input-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      return false;
    }
  } 
  return true;
}

function check_supplier_input(){
  var p = '#add-supplier-input-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      return false;
    }
  } 
  return true;
}

function check_item_input(){
  var p = '#add-item-input-';
  keys = ['quantity','unit', 'description', 'unit-price'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      return false;
    }
  } 
  return true;
}

function check_po_input(){
  var p = '#add-po-input-';
  keys = ['completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
    for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      return false;
    }
  } 
  if($('.item-list>tr').length <= 1) return false;
  return true;
}

function check_project_edit(){
  var p = '.project-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).html();
    if(input.trim() == ''){
      return false;
    }
  } 
  return true;
}

function check_supplier_edit(){
  var p = '.supplier-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).html();
    if(input.trim() == ''){
      return false;
    }
  } 
  return true;
}

function find_project_code(code){
  for(var i=0; i<projects.length; i++){
    if(projects[i]['project-code'] == code){
      return projects[i];
    }
  }
  return null;
}

function find_supplier_code(code){
  for(var i=0; i<suppliers.length; i++){
    if(suppliers[i]['supplier-code'] == code){
      return suppliers[i];
    }
  }
  return null;
}

function find_po_code(code){
  var project_code = code.substring(0,6);
  for(var i=0; i<projects.length; i++){
    if(projects[i]['project-code'] == project_code){
      if(projects[i]['pos'][code] != undefined) return projects[i]['pos'][code];
      return null;
    }
  }
  return null;
}

function arr_to_obj(arr){
  var obj = {};
  $.each(arr, function(index, value){
    obj[index] = value;
  })
  return obj;
}

function obj_to_arr(obj){
  return $.map(obj, function(value, index){
    return [value];
  });
}

function pc_is_existing(project_code) {
  for(var i = 0; i < projects.length; i++) {
      if(projects[i].hasOwnProperty('project-code') && projects[i]['project-code'] === project_code) {
          return true;
      }
  }
  return false;
}

function sc_is_existing(supplier_code) {
  for(var i = 0; i < suppliers.length; i++) {
      if(suppliers[i].hasOwnProperty('supplier-code') && suppliers[i]['supplier-code'] === supplier_code) {
          return true;
      }
  }
  return false;
}

function generate_project(){
  var p = '#add-project-input-';
  $('.add-project-modal>.modal-content>.input-field>label').addClass('active');
  $(p+'name').val(generate_projectname());
  $(p+'work-type').val(generate_worktype());
  $(p+'address').val(generate_address());
  $(p+'mobile-number').val(generate_mobile());
  $(p+'contact-person').val(generate_name());
  //ensure that there are no duplicate project codes
  pc = generate_projectcode();
  while(pc_is_existing(pc)){ 
    pc = generate_projectcode();
  }
  $(p+'project-code').val(pc);
}

function generate_supplier(){
  var p = '#add-supplier-input-';
  $('.add-supplier-modal>.modal-content>.input-field>label').addClass('active');
  $(p+'name').val(generate_suppliername());
  $(p+'vat-reg').val(generate_vatreg());
  $(p+'address').val(generate_address());
  $(p+'mobile-number').val(generate_mobile());
  $(p+'contact-person').val(generate_name());
  //ensure that there are no duplicate project codes
  sc = generate_suppliercode();
  while(sc_is_existing(sc)){ 
    sc = generate_suppliercode();
  }
  $(p+'supplier-code').val(sc);
}

function generate_po(){
  var p = '#add-po-input-';

  $('.add-po-modal>.modal-content>.input-field>label').addClass('active');
  $(p+'completion-date').val(generate_date());
  $(p+'requested-by').val(generate_name());
  $(p+'ordered-by').val(generate_name());
  $(p+'cost-ref').val('This is not a random data string.');
  $(p+'to-be-used-for').val('So is this. Haha.');
  $(p+'conforme').val(generate_name());

  tos = [];
  deliver_tos = [];
  $("#add-po-input-to option").each(function(){
    tos.push($(this).val());
  });
  $("#add-po-input-deliver-to option").each(function(){
    deliver_tos.push($(this).val());
  });
  if($("#add-po-input-to").val()==""){
    $('#add-po-input-to').val(tos[Math.floor(Math.random()*tos.length)]);
    $('#add-po-input-to').material_select();
  }
  if($("#adddpo-input-deliver-to").val()==""){
    $('#add-po-input-deliver-to').val(deliver_tos[Math.floor(Math.random()*deliver_tos.length)]);
    $('#add-po-input-deliver-to').material_select();
  }
}

function generate_item(){
  $('.add-item-row>td>div>label').addClass('active');
  $('#add-item-input-quantity').val(generate_number(1,20));
  $('#add-item-input-unit').val(generate_unit());
  $('#add-item-input-description').val(generate_item2());
  $('#add-item-input-unit-price').val(generate_price(100,2500));
}

function set_view_project(project){
  var p = '.project-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).html(project[keys[i]]);
  } 
  $('.add-po').attr('id', 'project-'+project['project-code']);
}

function set_view_supplier(supplier){
  var p = '.supplier-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).html(supplier[keys[i]]);
  } 
}

function set_view_po(po){
  create_project_options();
  create_supplier_options();

  $('.add-po-header').html('&nbsp;&nbsp;&nbsp;View Purchase Order ('+po['po-number']+')');
  $('.add-po-modal-btn-generate').hide();
  $('.add-po-modal-btn-add').hide();
  $('.add-po-modal-btn-amend').hide();
  $('.add-po-modal-btn-print').show();
  $('#hidden-po-number').val(po['po-number']);

  $('.add-po-modal>.modal-content>.input-field>label').addClass('active');
  var p = '#add-po-input-';
  keys = ['date', 'completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).val(po[keys[i]]);
    $(p+keys[i]).attr('readonly', '');
  }

  $(p+'to,'+p+'deliver-to').attr('disabled', '');

  $(p+'to,'+p+'deliver-to').material_select();
  $('.add-item-row').hide();
  $('.generate-po').hide();
  var items = po['items'];
  for(var key in items){
    if(items.hasOwnProperty(key)){
      $('.item-list').append(
        '<tr>'+
          '<td>'+items[key]['quantity']+'</td>'+
          '<td>'+items[key]['unit']+'</td>'+
          '<td>'+items[key]['description']+'</td>'+
          '<td><input type="checkbox" id="a'+items[key]['subtotal']+'" /><label for="a'+items[key]['subtotal']+'"></label></td>'+
      '<td><input type="checkbox" id="b'+items[key]['subtotal']+'" /><label for="b'+items[key]['subtotal']+'"></label></td>'+
      '<td><input type="checkbox" id="c'+items[key]['subtotal']+'" /><label for="c'+items[key]['subtotal']+'"></label></td>'+
          '<td>'+parseFloat(items[key]['unit-price']).toFixed(2)+'</td>'+
          '<td>'+parseFloat(items[key]['subtotal']).toFixed(2)+'</td>'+
          '<td></td>'+
        '</tr>'
      );
    }
  }
  $('.add-po-input-total-amount').html(po['total-amount']);
}

function set_amend_po(po){
  create_project_options();
  create_supplier_options();
  $('.add-po-header').html('&nbsp;&nbsp;&nbsp;Amend Purchase Order ('+po['po-number']+')');
  $('.add-po-modal-btn-generate').show();
  $('.add-po-modal-btn-add').hide();
  $('.add-po-modal-btn-amend').show();
  $('.add-po-modal-btn-amend').attr('id', po['po-number']);
  $('.add-po-modal-btn-print').hide();

  $('#hidden-po-number').val(po['po-number']);

  $('.add-po-modal>.modal-content>.input-field>label').addClass('active');
  var p = '#add-po-input-';
  keys = ['completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).val(po[keys[i]]);
  }
  $(p+'to,'+p+'deliver-to').material_select();
  var items = po['items'];
  for(var key in items){
    if(items.hasOwnProperty(key)){
      $('.item-list').append(
        '<tr>'+
          '<td>'+items[key]['quantity']+'</td>'+
          '<td>'+items[key]['unit']+'</td>'+
          '<td>'+items[key]['description']+'</td>'+
          '<td><input type="checkbox" id="a'+items[key]['subtotal']+'" /><label for="a'+items[key]['subtotal']+'"></label></td>'+
      '<td><input type="checkbox" id="b'+items[key]['subtotal']+'" /><label for="b'+items[key]['subtotal']+'"></label></td>'+
      '<td><input type="checkbox" id="c'+items[key]['subtotal']+'" /><label for="c'+items[key]['subtotal']+'"></label></td>'+
          '<td>'+items[key]['unit-price']+'</td>'+
          '<td>'+items[key]['subtotal']+'</td>'+
          '<td><i id="'+items[key]['subtotal']+'" class="material-icons clickable delete-item">close</i></td>'+
        '</tr>'
      );
    }
  }
  $('.add-po-input-total-amount').html(po['total-amount']);  
}

function set_add_po(project){

  $('#po-date-label').addClass('active');
  res = new Date();
  $('#add-po-input-date').val(res.getFullYear()+'-'+pad(res.getMonth()+1,2)+'-'+pad(res.getDate(),2));

  $('#add-po-input-deliver-to').val(project['project-code']);
  $('#add-po-input-deliver-to').material_select();
  $('.add-po-modal-btn-generate').show();
  $('.add-po-modal-btn-add').show();
  $('.add-po-modal-btn-amend').hide();
  $('.add-po-modal-btn-print').hide();
  $('.po-list').html('');
  var pos = project['pos'];

  var list = project['pos'];
  keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]});

  console.log(keysSorted);

  //needs improvement
  Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
  };

  for(var i=0; i<keysSorted.length; i++){
    if(keysSorted[i].length > 9){
      original = keysSorted[i].substring(0, 9);
      //break;
      for(var j=0; j<keysSorted.length; j++){
      //console.log(original);
      //console.log(keysSorted[j]);
        if(keysSorted[j] == original){
      //console.log('here');
          j++;
          while(keysSorted[j].length > 9){
            j++;
          }
          keysSorted = keysSorted.move(i,j);
          break;
        }
      }
    }
  }

  //console.log(keysSorted);

  for(var i=0; i<keysSorted.length; i++){
    key = keysSorted[i];
    if(pos.hasOwnProperty(key)){
      $('.po-list').append(
        '<tr id="'+key+'">'+
          '<td>'+key+'</td>'+
          '<td>'+((pos[key]['status'] == 1)?parseFloat(pos[key]['total-amount']).toFixed(2):'-----')+'</td>'+
          '<td>'+pos[key]['date']+'</td>'+
          '<td><i id="open-'+key+'" class="material-icons clickable tooltipped open-po" data-position="top" data-delay="20" data-tooltip="Open">open_in_browser</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="amend-'+key+'" class="material-icons clickable tooltipped amend-po" data-position="top" data-delay="20" data-tooltip="Amend">build</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="delete-'+key+'" class="material-icons clickable tooltipped delete-po" data-position="top" data-delay="20" data-tooltip="Delete">delete</i></td>'+
        '</tr>'
      );
    }

    $('.tooltipped').tooltip({delay: 50});
    
  }

}

function get_add_project_input(){
  var p = '#add-project-input-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  project = {};
  for(var i=0; i<keys.length; i+=1){
    project[keys[i]] = $(p+keys[i]).val();
  }
  project['pos'] = {};
  return project;
}

function get_add_supplier_input(){
  var p = '#add-supplier-input-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  supplier = {};
  for(var i=0; i<keys.length; i+=1){
    supplier[keys[i]] = $(p+keys[i]).val();
  }
  return supplier;
}

function get_add_item_input(){
  var p = '#add-item-input-';
  keys = ['quantity','unit', 'description', 'unit-price'];
  item = {};
  for(var i=0; i<keys.length; i+=1){
    item[keys[i]] = $(p+keys[i]).val();
  }
  return item;
}

function get_add_po_input(){
  var p = '#add-po-input-';
  keys = ['completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
  po = {};
  for(var i=0; i<keys.length; i+=1){
    po[keys[i]] = $(p+keys[i]).val();
  }
  var item_rows = $('.item-list>tr');
  var items = {};
  for(var i=1; i<item_rows.length; i++){
      items[i-1] = get_item_from_row(item_rows[i]);
  }
  po['items'] = items;
  po['total-amount'] = parseFloat($('.add-po-input-total-amount').html()).toFixed(2);
  res = new Date();
  po['date'] = res.getFullYear()+'-'+pad(res.getMonth()+1,2)+'-'+pad(res.getDate(),2);
  return po;
}

function get_amend_po_input(){
  var p = '#add-po-input-';
  keys = ['completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
  po = {};
  for(var i=0; i<keys.length; i+=1){
    po[keys[i]] = $(p+keys[i]).val();
  }
  var item_rows = $('.item-list>tr');
  var items = {};
  for(var i=1; i<item_rows.length; i++){
      items[i-1] = get_item_from_row(item_rows[i]);
  }
  po['items'] = items;
  po['total-amount'] = parseFloat($('.add-po-input-total-amount').html()).toFixed(2);
  res = new Date();
  po['date'] = res.getFullYear()+'-'+pad(res.getMonth()+1,2)+'-'+pad(res.getDate(),2);
  po['po-number'] = $('.add-po-modal-btn-amend').attr('id');
  return po;
}

function get_item_from_row(row){
  var item = {};
  item['quantity'] = row.children[0].innerHTML;
  item['unit'] = row.children[1].innerHTML;
  item['description'] = row.children[2].innerHTML;
  item['unit-price'] = row.children[3].innerHTML;
  item['subtotal'] = row.children[4].innerHTML;
  return item;
}

function get_edited_project(){
  var p = '.project-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  project = {};
  for(var i=0; i<keys.length; i+=1){
    project[keys[i]] = $(p+keys[i]).html();
  }
  return project;
}

function get_edited_supplier(){
  var p = '.supplier-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  supplier = {};
  for(var i=0; i<keys.length; i+=1){
    supplier[keys[i]] = $(p+keys[i]).html();
  }
  return supplier;
}

function clear_add_project(){
  var p = '#add-project-input-';
  var selector = ''+
    p+'name'+
    ','+p+'work-type'+
    ','+p+'address'+
    ','+p+'mobile-number'+
    ','+p+'contact-person'+
    ','+p+'project-code';
  $(selector).val('');
}

function clear_add_supplier(){
  var p = '#add-supplier-input-';
  var selector = ''+
    p+'name'+
    ','+p+'vat-reg'+
    ','+p+'address'+
    ','+p+'mobile-number'+
    ','+p+'contact-person';
  $(selector).val('');
}

function clear_add_po(){
  $('#po-date-label').addClass('active');
  res = new Date();
  $('#add-po-input-date').val(res.getFullYear()+'-'+pad(res.getMonth()+1,2)+'-'+pad(res.getDate(),2));

  $('.add-po-modal-btn-amend').hide();
  

  var p = '#add-po-input-';
  var selector = ''+
    p+'completion-date'+
    ','+p+'requested-by'+
    ','+p+'ordered-by'+
    ','+p+'cost-ref'+
    ','+p+'to-be-used-for'+
    ','+p+'conforme';
  $(selector).val('').removeAttr('readonly');
  $('.add-po-header').html('&nbsp;&nbsp;&nbsp;Add New Purchase Order');
  $('.add-po-modal-btn-print').hide();
  $('.add-item-row').show();
  $('.add-po-modal-btn-add').show();
  $('.generate-po').show();
  $('.add-po-input-total-amount').html('0');
  var item_rows = $('.item-list>tr');
  for(var i=item_rows.length-1; i>=1; i--){
    $('.item-list>tr')[1].remove();
  }
  create_project_options();
  create_supplier_options();
}

function clear_add_item(){
  var p = '#add-item-input-';
  var selector = ''+
    p+'quantity'+
    ','+p+'unit'+
    ','+p+'description'+
    ','+p+'unit-price';
  $(selector).val('');
}

function create_project_options(){
  var sb = '<option value="" disabled selected>Choose your option</option>';
  for(var i=0;i<projects.length; i++){
    sb += '<option value="'+projects[i]['project-code']+'">'+projects[i]['name']+'</option>'; 
  }
  $('#add-po-input-deliver-to').html(sb);
  $('#add-po-input-deliver-to').material_select();
}

function create_project_options2(){
  var sb = '<option value="" disabled selected>Choose your option</option>';
  for(var i=0;i<projects.length; i++){
    sb += '<option value="'+projects[i]['project-code']+'">'+projects[i]['name']+'</option>'; 
  }
  $('#po-summary-input-project').html(sb);
  $('#po-summary-input-project').material_select();
}


function create_supplier_options(){
  var sb = '<option value="" disabled selected>Choose your option</option>';
  for(var i=0;i<suppliers.length; i++){
    sb += '<option value="'+suppliers[i]['supplier-code']+'">'+suppliers[i]['name']+'</option>'; 
  }
  $('#add-po-input-to').html(sb);
  $('#add-po-input-to').material_select();
}

function three_digits(num){
  if(num < 10) return '00'+num;
  if(num < 100) return '0'+num;
  return num;
}