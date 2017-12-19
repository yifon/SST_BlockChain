package sst.bc.beans;

public class Bin {
	
	private int id;
	private int binNumber;
	@Override
	public String toString() {
		return "Bin [id=" + id + ", binNumber=" + binNumber + "]";
	}
	public Bin(int binNumber) {
		super();
		this.binNumber = binNumber;
	}
	public Bin(int id, int binNumber) {
		super();
		this.id = id;
		this.binNumber = binNumber;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getBinNumber() {
		return binNumber;
	}
	public void setBinNumber(int binNumber) {
		this.binNumber = binNumber;
	}

}
