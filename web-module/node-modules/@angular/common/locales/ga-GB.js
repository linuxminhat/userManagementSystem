/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(null, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/common/locales/ga-GB", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    // THIS CODE IS GENERATED - DO NOT MODIFY.
    var u = undefined;
    function plural(n) {
        if (n === 1)
            return 1;
        if (n === 2)
            return 2;
        if (n === Math.floor(n) && (n >= 3 && n <= 6))
            return 3;
        if (n === Math.floor(n) && (n >= 7 && n <= 10))
            return 4;
        return 5;
    }
    exports.default = ["ga-GB", [["r.n.", "i.n."], u, u], u, [["D", "L", "M", "C", "D", "A", "S"], ["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"], ["Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", "Dé Sathairn"], ["Do", "Lu", "Má", "Cé", "Dé", "Ao", "Sa"]], u, [["E", "F", "M", "A", "B", "M", "I", "L", "M", "D", "S", "N"], ["Ean", "Feabh", "Márta", "Aib", "Beal", "Meith", "Iúil", "Lún", "MFómh", "DFómh", "Samh", "Noll"], ["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig"]], u, [["RC", "AD"], u, ["Roimh Chríost", "Anno Domini"]], 1, [6, 0], ["dd/MM/y", "d MMM y", "d MMMM y", "EEEE d MMMM y"], ["HH:mm", "HH:mm:ss", "HH:mm:ss z", "HH:mm:ss zzzz"], ["{1} {0}", u, u, u], [".", ",", ";", "%", "+", "-", "E", "×", "‰", "∞", "NaN", ":"], ["#,##0.###", "#,##0%", "¤#,##0.00", "#E0"], "GBP", "£", "Punt Steirling", { "THB": ["฿"], "TWD": ["NT$"], "XXX": [] }, "ltr", plural];
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2EtR0IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb21tb24vbG9jYWxlcy9nYS1HQi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7OztJQUVILDBDQUEwQztJQUMxQyxJQUFNLENBQUMsR0FBRyxTQUFTLENBQUM7SUFFcEIsU0FBUyxNQUFNLENBQUMsQ0FBUztRQUV6QixJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ1AsT0FBTyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLE9BQU8sQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMxQyxPQUFPLENBQUMsQ0FBQztRQUNiLE9BQU8sQ0FBQyxDQUFDO0lBQ1QsQ0FBQztJQUVELGtCQUFlLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLGNBQWMsRUFBQyxVQUFVLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBQyxXQUFXLEVBQUMsV0FBVyxFQUFDLGFBQWEsQ0FBQyxFQUFDLENBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLE9BQU8sRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLFdBQVcsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxjQUFjLEVBQUMsa0JBQWtCLEVBQUMsU0FBUyxFQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsZUFBZSxFQUFDLGFBQWEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsZUFBZSxDQUFDLEVBQUMsQ0FBQyxPQUFPLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxlQUFlLENBQUMsRUFBQyxDQUFDLFNBQVMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEtBQUssRUFBQyxHQUFHLENBQUMsRUFBQyxDQUFDLFdBQVcsRUFBQyxRQUFRLEVBQUMsV0FBVyxFQUFDLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsZ0JBQWdCLEVBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLEVBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8vIFRISVMgQ09ERSBJUyBHRU5FUkFURUQgLSBETyBOT1QgTU9ESUZZLlxuY29uc3QgdSA9IHVuZGVmaW5lZDtcblxuZnVuY3Rpb24gcGx1cmFsKG46IG51bWJlcik6IG51bWJlciB7XG5cbmlmIChuID09PSAxKVxuICAgIHJldHVybiAxO1xuaWYgKG4gPT09IDIpXG4gICAgcmV0dXJuIDI7XG5pZiAobiA9PT0gTWF0aC5mbG9vcihuKSAmJiAobiA+PSAzICYmIG4gPD0gNikpXG4gICAgcmV0dXJuIDM7XG5pZiAobiA9PT0gTWF0aC5mbG9vcihuKSAmJiAobiA+PSA3ICYmIG4gPD0gMTApKVxuICAgIHJldHVybiA0O1xucmV0dXJuIDU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IFtcImdhLUdCXCIsW1tcInIubi5cIixcImkubi5cIl0sdSx1XSx1LFtbXCJEXCIsXCJMXCIsXCJNXCIsXCJDXCIsXCJEXCIsXCJBXCIsXCJTXCJdLFtcIkRvbWhcIixcIkx1YW5cIixcIk3DoWlydFwiLFwiQ8OpYWRcIixcIkTDqWFyXCIsXCJBb2luZVwiLFwiU2F0aFwiXSxbXCJEw6kgRG9taG5haWdoXCIsXCJEw6kgTHVhaW5cIixcIkTDqSBNw6FpcnRcIixcIkTDqSBDw6lhZGFvaW5cIixcIkTDqWFyZGFvaW5cIixcIkTDqSBoQW9pbmVcIixcIkTDqSBTYXRoYWlyblwiXSxbXCJEb1wiLFwiTHVcIixcIk3DoVwiLFwiQ8OpXCIsXCJEw6lcIixcIkFvXCIsXCJTYVwiXV0sdSxbW1wiRVwiLFwiRlwiLFwiTVwiLFwiQVwiLFwiQlwiLFwiTVwiLFwiSVwiLFwiTFwiLFwiTVwiLFwiRFwiLFwiU1wiLFwiTlwiXSxbXCJFYW5cIixcIkZlYWJoXCIsXCJNw6FydGFcIixcIkFpYlwiLFwiQmVhbFwiLFwiTWVpdGhcIixcIknDumlsXCIsXCJMw7puXCIsXCJNRsOzbWhcIixcIkRGw7NtaFwiLFwiU2FtaFwiLFwiTm9sbFwiXSxbXCJFYW7DoWlyXCIsXCJGZWFiaHJhXCIsXCJNw6FydGFcIixcIkFpYnJlw6FuXCIsXCJCZWFsdGFpbmVcIixcIk1laXRoZWFtaFwiLFwiScO6aWxcIixcIkzDum5hc2FcIixcIk1lw6FuIEbDs21oYWlyXCIsXCJEZWlyZWFkaCBGw7NtaGFpclwiLFwiU2FtaGFpblwiLFwiTm9sbGFpZ1wiXV0sdSxbW1wiUkNcIixcIkFEXCJdLHUsW1wiUm9pbWggQ2hyw61vc3RcIixcIkFubm8gRG9taW5pXCJdXSwxLFs2LDBdLFtcImRkL01NL3lcIixcImQgTU1NIHlcIixcImQgTU1NTSB5XCIsXCJFRUVFIGQgTU1NTSB5XCJdLFtcIkhIOm1tXCIsXCJISDptbTpzc1wiLFwiSEg6bW06c3MgelwiLFwiSEg6bW06c3Mgenp6elwiXSxbXCJ7MX0gezB9XCIsdSx1LHVdLFtcIi5cIixcIixcIixcIjtcIixcIiVcIixcIitcIixcIi1cIixcIkVcIixcIsOXXCIsXCLigLBcIixcIuKInlwiLFwiTmFOXCIsXCI6XCJdLFtcIiMsIyMwLiMjI1wiLFwiIywjIzAlXCIsXCLCpCMsIyMwLjAwXCIsXCIjRTBcIl0sXCJHQlBcIixcIsKjXCIsXCJQdW50IFN0ZWlybGluZ1wiLHtcIlRIQlwiOltcIuC4v1wiXSxcIlRXRFwiOltcIk5UJFwiXSxcIlhYWFwiOltdfSxcImx0clwiLCBwbHVyYWxdO1xuIl19