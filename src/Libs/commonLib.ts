import { Injectable } from "@angular/core";

@Injectable()
export class Lib {

    /**
     *
     * @param totalItems total items
     * @param currentPage total items
     * @param numberItemsPerPage total items
     * @returns {any}
     * @constructor
     */
    static GetPager(totalItems, currentPage, numberItemsPerPage) {
        // default to first page
        currentPage = currentPage || 1;
  
        // default page size is 5
        numberItemsPerPage = numberItemsPerPage || 5;
        //pageSize = 5;
  
        var numberPages = 6;
        // calculate total pages
        var totalPages = Math.ceil(totalItems / numberItemsPerPage);
  
        var startPage, endPage;
        if (totalPages <= numberPages) {
            // less than 5 total pages so show all
            startPage = 1;
            endPage = totalPages;
        } else {
            // more than 5 total pages so calculate start and end pages
            if (currentPage <= (Math.ceil(numberPages / 2)+1)) {
                startPage = 1;
                endPage = numberPages;
            } else if (currentPage + numberPages - (Math.ceil(numberPages / 2)+1) >= totalPages) {
                startPage = totalPages - (numberPages-1);
                endPage = totalPages;
            } else {
                startPage = currentPage - Math.ceil(numberPages / 2);
                endPage = currentPage + numberPages - (Math.ceil(numberPages / 2)+1);
            }
        }
  
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * numberItemsPerPage;
        var endIndex = Math.min(startIndex + numberItemsPerPage - 1, totalItems - 1);
  
        // return object with all pager properties required by the view
        return {
            currentPage: currentPage,
            startIndex: startIndex,
            endIndex: endIndex,
            totalPages: totalPages
        }
    }

}