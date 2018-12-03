package com.wonjun;

import java.util.List;

public class SearchResult {

    private String startDate;
    private String endDate;
    private String timeUnit;
    private List<Results> results;

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getTimeUnit() {
        return timeUnit;
    }

    public void setTimeUnit(String timeUnit) {
        this.timeUnit = timeUnit;
    }

    public List<Results> getResults() {
        return results;
    }

    public void setResults(List<Results> results) {
        this.results = results;
    }

    @Override
    public String toString() {
        return "SearchResult{" +
                "startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", timeUnit='" + timeUnit + '\'' +
                ", results=" + results +
                '}';
    }


    public static class Results {

        private String title;
        private List<String> keywords;
        private List<Data> data;

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public List<String> getKeywords() {
            return keywords;
        }

        public void setKeywords(List<String> keywords) {
            this.keywords = keywords;
        }

        public List<Data> getData() {
            return data;
        }

        public void setData(List<Data> data) {
            this.data = data;
        }

        @Override
        public String toString() {
            return "Results{" +
                    "title='" + title + '\'' +
                    ", keywords=" + keywords +
                    ", data=" + data +
                    '}';
        }

        public static class Data {

            private String period;
            private String ratio;

            public String getPeriod() {
                return period;
            }

            public void setPeriod(String period) {
                this.period = period;
            }

            public String getRatio() {
                return ratio;
            }

            public void setRatio(String ratio) {
                this.ratio = ratio;
            }

            @Override
            public String toString() {
                return "Data{" +
                        "period='" + period + '\'' +
                        ", ratio='" + ratio + '\'' +
                        '}';
            }
        }
    }

}
