package org.joget.apps.datalist.model;

import java.util.ArrayList;
import java.util.Collection;

/**
 * Contains meta data regarding a data list column
 */
public class DataListColumn {

    public DataListColumn() {
    }

    public DataListColumn(String name, String label, boolean sortable) {
        this.name = name;
        this.label = label;
        this.sortable = sortable;
    }
    /**
     * Identifier for the column
     */
    private String name;
    /**
     * Descriptive label for the column
     */
    private String label;
    /**
     * Flag to indicate if column is sortable
     */
    private boolean sortable;
    /**
     * Optional action for this column
     */
    private DataListAction action;
    /**
     * Optional link to a URL
     */
    /**
     * Formatters for the column
     */
    private Collection<DataListColumnFormat> formats;
    /**
     * Optional field to store the DB type e.g. VARCHAR, etc
     */
    private String type;
    /**
     * Flag to indicate whether to render the column as HTML content
     */
    private boolean renderHtml = true;

    /**
     * Convenience method to add a format to this column
     * @param format
     * @return
     */
    public DataListColumn addFormat(DataListColumnFormat format) {
        if (formats == null) {
            formats = new ArrayList<DataListColumnFormat>();
        }
        formats.add(format);
        return this;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public boolean isSortable() {
        return sortable;
    }

    public void setSortable(boolean sortable) {
        this.sortable = sortable;
    }

    public DataListAction getAction() {
        return action;
    }

    public void setAction(DataListAction action) {
        this.action = action;
    }

    public Collection<DataListColumnFormat> getFormats() {
        return formats;
    }

    public void setFormats(Collection<DataListColumnFormat> formats) {
        this.formats = formats;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public boolean isRenderHtml() {
        return renderHtml;
    }

    public void setRenderHtml(boolean renderHtml) {
        this.renderHtml = renderHtml;
    }
}
