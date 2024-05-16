import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../../../components/common/Pagination";

describe("Pagination component", () => {
  const defaultProps = {
    setLength: 5,
    pageLength: 10,
    totalResults: 101,
    paginationData: { currentPage: 1, pageSetList: [1, 2, 3, 4, 5] },
    setPaginationData: jest.fn(),
  };

  const renderComponent = (props = {}) =>
    render(<Pagination {...defaultProps} {...props} />);

  test("should load pagination component", () => {
    renderComponent({
      paginationData: { currentPage: 1, pageSetList: [1, 2, 3, 4, 5] },
    });

    expect(screen.getByTestId("pagination")).toBeInTheDocument();
    expect(screen.getByTestId("previous-page-set-list")).toBeInTheDocument();
    expect(screen.getByTestId("previous-page")).toBeInTheDocument();
    expect(screen.getByTestId("next-page")).toBeInTheDocument();
    expect(screen.getByTestId("next-page-set-list")).toBeInTheDocument();
    expect(screen.getAllByTestId("page-number")).toHaveLength(5);
  });

  test("should not load pagination if pageSetList is empty", () => {
    renderComponent({ paginationData: { currentPage: 1, pageSetList: [] } });

    expect(screen.queryByTestId("pagination")).not.toBeInTheDocument();
  });

  test("should not load previous and next page set buttons if page set length is not equal to set length", () => {
    renderComponent({
      paginationData: { currentPage: 1, pageSetList: [1, 2, 3] },
    });

    expect(
      screen.queryByTestId("previous-page-set-list")
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("next-page-set-list")).not.toBeInTheDocument();
  });

  test("previous page set list button should be disabled if current page set is first", () => {
    renderComponent({
      paginationData: { currentPage: 1, pageSetList: [1, 2, 3, 4, 5] },
    });

    const previousPageSetListButton = screen.getByTestId(
      "previous-page-set-list"
    );
    fireEvent.click(previousPageSetListButton);

    expect(previousPageSetListButton).toBeDisabled();
  });

  test("next page set list button should be disabled if current page set is last", () => {
    renderComponent({
      paginationData: { currentPage: 7, pageSetList: [7, 8, 9, 10, 11] },
    });

    const nextPageSetListButton = screen.getByTestId("next-page-set-list");
    fireEvent.click(nextPageSetListButton);

    expect(nextPageSetListButton).toBeDisabled();
  });

  test("should have correct class when currentPage is lastPage", () => {
    renderComponent({
      paginationData: { currentPage: 11, pageSetList: [7, 8, 9, 10, 11] },
    });

    const nextPageButton = screen.getByTestId("next-page");
    expect(nextPageButton).toHaveClass("cursor-not-allowed opacity-50");
  });

  describe("useEffect", () => {
    test("should set pageSetList when currentPage is 1 and pageSetList is empty", () => {
      const setPaginationDataMock = jest.fn();
      renderComponent({
        paginationData: { currentPage: 1, pageSetList: [] },
        setPaginationData: setPaginationDataMock,
      });

      expect(setPaginationDataMock).toHaveBeenCalledWith({
        currentPage: 1,
        pageSetList: [1, 2, 3, 4, 5],
      });
    });

    test("should not set pageSetList when currentPage is not 1", () => {
      const setPaginationDataMock = jest.fn();
      renderComponent({
        paginationData: { currentPage: 2, pageSetList: [] },
        setPaginationData: setPaginationDataMock,
      });

      expect(setPaginationDataMock).not.toHaveBeenCalled();
    });

    test("should not set pageSetList when pageSetList is not empty", () => {
      const setPaginationDataMock = jest.fn();
      renderComponent({
        paginationData: { currentPage: 1, pageSetList: [1, 2, 3] },
        setPaginationData: setPaginationDataMock,
      });

      expect(setPaginationDataMock).not.toHaveBeenCalled();
    });
  });

  describe("handleNextPage", () => {
    test("should update current page to next page()", () => {
      renderComponent({
        paginationData: { currentPage: 1, pageSetList: [1, 2, 3, 4, 5] },
      });

      const nextPageButton = screen.getByTestId("next-page");
      fireEvent.click(nextPageButton);

      expect(defaultProps.setPaginationData).toHaveBeenCalledWith({
        currentPage: 2,
        pageSetList: [1, 2, 3, 4, 5],
      });
    });

    test("should change set if currentPage is greater than the last page", () => {
      renderComponent({
        paginationData: { currentPage: 5, pageSetList: [1, 2, 3, 4, 5] },
      });

      const nextPageButton = screen.getByTestId("next-page");
      fireEvent.click(nextPageButton);

      expect(defaultProps.setPaginationData).toHaveBeenCalledWith({
        currentPage: 6,
        pageSetList: [6, 7, 8, 9, 10],
      });
    });
  });

  describe("handlePreviousPage", () => {
    test("should update current page to previous page()", () => {
      renderComponent({
        paginationData: { currentPage: 2, pageSetList: [1, 2, 3, 4, 5] },
      });

      const previousPageButton = screen.getByTestId("previous-page");
      fireEvent.click(previousPageButton);

      expect(defaultProps.setPaginationData).toHaveBeenCalledWith({
        currentPage: 1,
        pageSetList: [1, 2, 3, 4, 5],
      });
    });

    test("should change set if currentPage is less than set first page", () => {
      renderComponent({
        paginationData: { currentPage: 6, pageSetList: [6, 7, 8, 9, 10] },
      });

      const previousPageButton = screen.getByTestId("previous-page");
      fireEvent.click(previousPageButton);

      expect(defaultProps.setPaginationData).toHaveBeenCalledWith({
        currentPage: 5,
        pageSetList: [1, 2, 3, 4, 5],
      });
    });
  });

  describe("handlePageSetChange()", () => {
    test("next page set button click should update pageSetList", () => {
      renderComponent({
        paginationData: { currentPage: 1, pageSetList: [1, 2, 3, 4, 5] },
      });

      const nextPageSetListButton = screen.getByTestId("next-page-set-list");
      fireEvent.click(nextPageSetListButton);

      expect(defaultProps.setPaginationData).toHaveBeenCalledWith({
        currentPage: 6,
        pageSetList: [6, 7, 8, 9, 10],
      });
    });
  });

  test("previous page set should update pageSetList", () => {
    renderComponent({
      paginationData: { currentPage: 6, pageSetList: [6, 7, 8, 9, 10] },
    });

    const previousPageSetListButton = screen.getByTestId(
      "previous-page-set-list"
    );
    fireEvent.click(previousPageSetListButton);

    expect(defaultProps.setPaginationData).toHaveBeenCalledWith({
      currentPage: 1,
      pageSetList: [1, 2, 3, 4, 5],
    });
  });

  test("should adjust startNumber if endNumber exceeds lastPage", () => {
    renderComponent({
      paginationData: { currentPage: 6, pageSetList: [6, 7, 8, 9, 10] },
    });

    const nextPageSetListButton = screen.getByTestId("next-page-set-list");
    fireEvent.click(nextPageSetListButton);

    expect(defaultProps.setPaginationData).toHaveBeenCalledWith({
      currentPage: 7,
      pageSetList: [7, 8, 9, 10, 11],
    });
  });

  test("clicking on a page number button should update the current page", () => {
    renderComponent({
      paginationData: { currentPage: 1, pageSetList: [1, 2, 3, 4, 5] },
    });

    const pageNumberButton = screen.getAllByTestId("page-number");
    fireEvent.click(pageNumberButton[2]);

    expect(defaultProps.setPaginationData).toHaveBeenCalledWith({
      currentPage: 3,
      pageSetList: [1, 2, 3, 4, 5],
    });
  });
});
